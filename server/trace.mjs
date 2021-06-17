import {
    TraceIdRatioBasedSampler,
    HttpTraceContextPropagator,
} from '@opentelemetry/core'
import { NodeTracerProvider } from '@opentelemetry/node'
import { SimpleSpanProcessor } from '@opentelemetry/tracing'
import { AsyncHooksContextManager } from '@opentelemetry/context-async-hooks'
import { TraceExporter } from '@google-cloud/opentelemetry-cloud-trace-exporter'

// Enable OpenTelemetry exporters to export traces to Google Cloud Trace.
// Exporters use Application Default Credentials (ADCs) to authenticate.
// See https://developers.google.com/identity/protocols/application-default-credentials
// for more details.
const provider = new NodeTracerProvider({
    sampler: new TraceIdRatioBasedSampler(0.5),
    resource: {
        attributes: {
            revision: process.env.K_REVISION
        }
    }
});

provider.register({
    contextManager: (new AsyncHooksContextManager()).enable(),
    propagator: new HttpTraceContextPropagator(),
})

// Initialize the exporter. When your application is running on Google Cloud,
// you don't need to provide auth credentials or a project id.
const exporter = new TraceExporter();

// Configure the span processor to send spans to the exporter
provider.addSpanProcessor(new SimpleSpanProcessor(exporter));