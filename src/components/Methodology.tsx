export function Methodology() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 lg:px-0">
      <header className="mb-16 animate-fade-in">
        <p className="font-serif text-sm uppercase tracking-[0.3em] text-museum-muted">
          Behind the exhibition
        </p>
        <h2 className="mt-4 font-serif text-4xl font-light tracking-wide text-museum-cream lg:text-5xl">
          Methodology
        </h2>
        <p className="mt-6 font-serif text-lg leading-relaxed text-museum-cream/70">
          How eight GPT-5 models became eight artists — and how Neon&apos;s
          branching architecture made it possible.
        </p>
      </header>

      <div className="space-y-16">
        <Section title="The conceit">
          <p>
            Each painting in this gallery was commissioned with the same brief:
            create an impressionist oil painting. But the brief was delivered to
            a different{" "}
            <strong className="text-museum-cream">GPT-5 model variant</strong>{" "}
            on each occasion — from the economical{" "}
            <code className="rounded bg-museum-plaque px-1.5 py-0.5 font-mono text-sm text-neon-green">
              gpt-5-nano
            </code>{" "}
            to the expressive{" "}
            <code className="rounded bg-museum-plaque px-1.5 py-0.5 font-mono text-sm text-neon-green">
              gpt-5-6-sol
            </code>
            .
          </p>
          <p>
            The model is the artist. It interprets the subject, chooses its
            palette, and composes the scene through OpenAI&apos;s{" "}
            <code className="rounded bg-museum-plaque px-1.5 py-0.5 font-mono text-sm">
              image_generation
            </code>{" "}
            tool — exposed via the Neon AI Gateway Responses API. Every model
            shares the same renderer, but each brings a distinct sensibility to
            light, color, and form.
          </p>
        </Section>

        <Section title="Neon AI Gateway">
          <p>
            All inference routes through{" "}
            <a
              href="https://neon.com/docs/ai-gateway/overview"
              className="text-neon-green underline decoration-neon-green/30 underline-offset-4 transition-colors hover:decoration-neon-green"
              target="_blank"
              rel="noopener noreferrer"
            >
              Neon AI Gateway
            </a>
            , a model gateway built into the Neon backend. One Neon credential
            reaches every supported model — no separate OpenAI API keys, no
            provider-specific SDK configuration.
          </p>
          <CodeBlock>
            {`import { neon } from '@neon/ai-sdk-provider';
import { streamText } from 'ai';

const result = streamText({
  model: neon('gpt-5-mini'),
  messages: [{ role: 'user', content: prompt }],
  tools: {
    image: neon.tools.imageGeneration({
      outputFormat: 'jpeg',
      quality: 'low',
      size: '1024x1024',
    }),
  },
});`}
          </CodeBlock>
          <p>
            Image generation is available only through the Responses API tool —
            not via a dedicated{" "}
            <code className="rounded bg-museum-plaque px-1.5 py-0.5 font-mono text-sm">
              generateImage()
            </code>{" "}
            endpoint. We use{" "}
            <code className="rounded bg-museum-plaque px-1.5 py-0.5 font-mono text-sm">
              streamText
            </code>{" "}
            because the gateway caps non-streaming responses near 640&nbsp;KB.
          </p>
        </Section>

        <Section title="One branch per model">
          <p>
            Neon&apos;s{" "}
            <a
              href="https://neon.com/docs/introduction/branching"
              className="text-neon-green underline decoration-neon-green/30 underline-offset-4 transition-colors hover:decoration-neon-green"
              target="_blank"
              rel="noopener noreferrer"
            >
              database branching
            </a>{" "}
            extends to AI Gateway endpoints. Each GPT-5 variant in this
            exhibition has its own branch — an isolated environment where that
            model&apos;s gateway endpoint, database, and generated artwork
            metadata live together.
          </p>
          <div className="mt-6 overflow-hidden rounded-sm border border-museum-border">
            <table className="w-full font-serif text-sm">
              <thead>
                <tr className="border-b border-museum-border bg-museum-plaque">
                  <th className="px-4 py-3 text-left font-serif text-museum-muted">
                    Branch
                  </th>
                  <th className="px-4 py-3 text-left font-serif text-museum-muted">
                    Model
                  </th>
                  <th className="px-4 py-3 text-left font-serif text-museum-muted">
                    Subject
                  </th>
                </tr>
              </thead>
              <tbody className="text-museum-cream/80">
                {BRANCHES.map((b) => (
                  <tr key={b.branch} className="border-b border-museum-border/50">
                    <td className="px-4 py-3 text-neon-green">{b.branch}</td>
                    <td className="px-4 py-3">{b.model}</td>
                    <td className="px-4 py-3 text-museum-muted">{b.subject}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-base text-museum-muted">
            If you use Neon branches for preview deployments, AI requests from a
            feature branch are scoped to that branch — the same isolation your
            database already gets.
          </p>
        </Section>

        <Section title="Stack">
          <ul className="space-y-4">
            <StackItem
              name="Neon"
              role="Postgres database + AI Gateway + branching"
              href="https://neon.com"
            />
            <StackItem
              name="Vercel AI SDK"
              role="@neon/ai-sdk-provider for image generation"
              href="https://ai-sdk.dev/providers/community-providers/neon-ai-gateway"
            />
            <StackItem
              name="Next.js"
              role="Gallery frontend, deployed to Vercel"
              href="https://nextjs.org"
            />
            <StackItem
              name="Vercel"
              role="Static hosting with edge delivery"
              href="https://vercel.com"
            />
            <StackItem
              name="GitHub"
              role="Source code for this exhibition"
              href="https://github.com/carlotas19/ai-impressionist-museum"
            />
          </ul>
          <p className="mt-6 text-base text-museum-muted">
            Fork it, remix a plaque, or regenerate the collection from{" "}
            <a
              href="https://github.com/carlotas19/ai-impressionist-museum"
              className="text-neon-green underline decoration-neon-green/30 underline-offset-4 transition-colors hover:decoration-neon-green"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/carlotas19/ai-impressionist-museum
            </a>
            .
          </p>
        </Section>

        <Section title="Generating the collection">
          <p>
            Run the included generation script to produce (or refresh) the
            gallery. It creates a branch per model, calls AI Gateway on each
            branch&apos;s endpoint, saves JPEGs to{" "}
            <code className="rounded bg-museum-plaque px-1.5 py-0.5 font-mono text-sm">
              public/art/
            </code>
            , and writes metadata to Postgres.
          </p>
          <CodeBlock>
            {`# Requires a Neon project in aws-us-east-2 (Ohio)
cp .env.example .env.local
npm run setup:db
npm run setup:branches
npm run generate`}
          </CodeBlock>
          <p className="text-base text-museum-muted">
            AI Gateway is in beta, requires a paid Neon plan, and is available
            only in AWS US East (Ohio). Inference is free during beta.{" "}
            <a
              href="https://neon.com/docs/ai-gateway/overview"
              className="text-neon-green underline decoration-neon-green/30 underline-offset-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn more
            </a>
            .
          </p>
        </Section>
      </div>
    </article>
  );
}

const BRANCHES = [
  { branch: "model-gpt-5-nano", model: "gpt-5-nano", subject: "Water Lilies at Dusk" },
  { branch: "model-gpt-5-mini", model: "gpt-5-mini", subject: "Boulevard in the Rain" },
  { branch: "model-gpt-5-4-mini", model: "gpt-5-4-mini", subject: "Field of Poppies" },
  { branch: "model-gpt-5-4", model: "gpt-5-4", subject: "Harbor at Sunrise" },
  { branch: "model-gpt-5-6-luna", model: "gpt-5-6-luna", subject: "Woman with a Parasol" },
  { branch: "model-gpt-5-6-terra", model: "gpt-5-6-terra", subject: "Haystacks in Golden Light" },
  { branch: "model-gpt-5-5", model: "gpt-5-5", subject: "Dance at the Ball" },
  { branch: "model-gpt-5-6-sol", model: "gpt-5-6-sol", subject: "Montmartre Café Terrace" },
];

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="animate-fade-in space-y-4 font-serif text-lg leading-relaxed text-museum-cream/70">
      <h3 className="font-serif text-2xl font-light text-museum-cream">
        {title}
      </h3>
      {children}
    </section>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="mt-4 overflow-x-auto rounded-sm border border-museum-border bg-museum-plaque p-6 font-mono text-xs leading-relaxed text-museum-cream/80">
      <code>{children}</code>
    </pre>
  );
}

function StackItem({
  name,
  role,
  href,
}: {
  name: string;
  role: string;
  href: string;
}) {
  return (
    <li className="flex items-baseline justify-between border-b border-museum-border/50 pb-4">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-serif text-lg text-museum-cream transition-colors hover:text-neon-green"
      >
        {name}
      </a>
      <span className="text-right text-base text-museum-muted">{role}</span>
    </li>
  );
}
