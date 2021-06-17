import opentelemetry from '@opentelemetry/api'
import {
    TraceIdRatioBasedSampler,
    HttpTraceContextPropagator,
} from '@opentelemetry/core'
import { NodeTracerProvider } from '@opentelemetry/node'
import { BatchSpanProcessor } from '@opentelemetry/tracing'
import { MeterProvider } from '@opentelemetry/metrics'
import { HostMetrics } from '@opentelemetry/host-metrics'
import { AsyncHooksContextManager } from '@opentelemetry/context-async-hooks'
import env from './env.mjs'

let traceExporter = null
let metricExporter = null

const resource = {
    attributes: {
        'service.env': env.isProduction ? 'production' : 'development',
        'service.name': env.serviceName,
        'service.revision': env.serviceRevision
    }
}

if (env.isProduction) {
    const { MetricExporter } = await import('@google-cloud/opentelemetry-cloud-monitoring-exporter');
    const { TraceExporter } = await import('@google-cloud/opentelemetry-cloud-trace-exporter')
    metricExporter = new MetricExporter()
    traceExporter = new TraceExporter();
} else {
    const { JaegerExporter } = await import('@opentelemetry/exporter-jaeger');
    traceExporter = new JaegerExporter({ serviceName: env.serviceName });
}

const spanProcessor = new BatchSpanProcessor(traceExporter)
const tracePropagator = new HttpTraceContextPropagator()
const contextManager = new AsyncHooksContextManager()

if (metricExporter) {
    const meterProvider = new MeterProvider({
        exporter: metricExporter,
        resource,
        interval: env.isProduction ? 2000 : 10000,
    });

    const hostMetrics = new HostMetrics({ meterProvider, name: 'example-host-metrics' });
    hostMetrics.start();
}

const tracerProvider = new NodeTracerProvider({
    sampler: new TraceIdRatioBasedSampler(0.5),
    resource,
});

tracerProvider.register({
    contextManager: contextManager.enable(),
    propagator: tracePropagator,
})

tracerProvider.addSpanProcessor(spanProcessor);

/**
 * Set the global tracer provider
 */
opentelemetry.trace.setGlobalTracerProvider(tracerProvider);