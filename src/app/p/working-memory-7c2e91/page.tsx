import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { StyledButton } from '@/components/StyledButton';
import { FeedbackForm } from '@/components/FeedbackForm';
import { CopyBlock } from '@/components/CopyBlock';

// Unlisted resource page, shared by link only: noindex, not in the sitemap,
// hashed slug, zip under the same hashed path. Same intent as the static
// page under public/p.

const ZIP = '/p/working-memory-7c2e91/working-memory.zip';
const MAILTO = 'mailto:dan@robson.studio?subject=Working%20Memory%20feedback';

const FEEDBACK_PROMPT = `Read AGENTS.md. Then write a feedback note for the person who built this working memory system, from the evidence in this folder: the Logbook, the Handover archive, the Wiki, and the profile pages.

Cover, in plain sentences:
- Which skills I used and which I never touched.
- Where the onboarding asked something badly, or asked twice.
- Where it filed something to the wrong page, or missed something I said.
- What OneDrive or the machine did that got in the way.
- What I changed or added, and what I would change if I could.
- Whether the daily rituals earned their place, and how long they took.
- What it should never do that it did, and what it did that I did not expect.

Quote Logbook lines as evidence where useful. Do not include anything from the boundaries page, any person's name, or anything about the organisation; the note is about the system, not the work. Save it to 03-working-files/documents/YYYY-MM-DD-feedback.md and tell me the path.`;

export const metadata: Metadata = {
  title: 'Working Memory System for Codex — a starter kit from Robson Studio',
  description:
    'A folder of plain Markdown files that gives Codex a working memory: who you deal with, what was decided, where everything is up to. Built for a locked-down enterprise machine.',
  alternates: { canonical: '/p/working-memory-7c2e91' },
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function WorkingMemorySystemResource() {
  return (
    <div style={{ maxWidth: '90rem', margin: '0 auto' }}>
      <Nav />
      <main>
        <section className="relative" style={{ padding: '10rem 1.5rem 4rem' }}>
          <div className="w-full md:pl-[calc(25%-5rem)]" style={{ maxWidth: '90rem', margin: '0 auto' }}>
            <article className="paper" style={{ maxWidth: '42.5rem' }}>
              <Meta>A resource from Robson Studio · September 2026</Meta>
              <h1
                className="leading-[1.1]"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 400,
                  fontSize: 'clamp(2.5rem, 6vw, 3.5rem)',
                  letterSpacing: '-0.06rem',
                  marginBottom: '1rem',
                }}
              >
                Working Memory System for Codex
              </h1>
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  color: 'var(--foreground)',
                  fontSize: '1.25rem',
                  lineHeight: 1.4,
                  marginBottom: '2rem',
                }}
              >
                A folder of plain Markdown files that turns Codex into an assistant that
                remembers who you deal with, what was decided, and where everything is up to.
                Built for one person working inside a locked-down enterprise environment.
              </p>

              <div style={{ marginBottom: '3rem' }}>
                <StyledButton href={ZIP}>Download the starter kit (zip, 56 KB)</StyledButton>
                <Meta>
                  <span style={{ display: 'block', marginTop: '0.75rem' }}>
                    56 files, all Markdown. Nothing to install. Set-up is ten minutes and{' '}
                    <code>start-here.md</code> walks it.
                  </span>
                </Meta>
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  color: 'rgba(36,16,19,0.85)',
                  fontSize: '1rem',
                  lineHeight: 1.7,
                }}
              >
                <H2>The parts</H2>
                <Ul>
                  <li>
                    <strong>Your Profile.</strong> Who you are, how you work, how you sound, and
                    what stays private. Four pages, in your words.
                  </li>
                  <li>
                    <strong>Wiki.</strong> One page per person, project, tool and insight, with a map
                    at the front. Person pages carry a weight you set for how much their word moves
                    you; when two people disagree, the weights pick the default and the disagreement
                    is recorded.
                  </li>
                  <li>
                    <strong>Working Files.</strong> Documents you want it to read. Status lives on the
                    Wiki page, not in the folder.
                  </li>
                  <li>
                    <strong>Drop Zone.</strong> The tray. Anything goes in; it files it and empties
                    the tray.
                  </li>
                  <li>
                    <strong>Handover.</strong> The note each session leaves for the next, so tomorrow
                    starts where today stopped.
                  </li>
                  <li>
                    <strong>Logbook.</strong> What it did, one file per month, so trust never rests on
                    memory.
                  </li>
                  <li>
                    <strong>Rules.</strong> One file it reads every session, plus a shelf for the
                    detail. When you say &ldquo;never do that&rdquo;, it becomes a rule on the spot.
                  </li>
                  <li>
                    <strong>Skills.</strong> Sixteen jobs it knows how to do, invoked by name. Listed below.
                  </li>
                  <li>
                    <strong>Routines.</strong> Any skill on a schedule, if you want it there. The
                    recipes for the usual three are included: start the day on weekday mornings, end
                    of day on weekday afternoons, lint on Fridays.
                  </li>
                </Ul>
                <P>
                  Every fact on a page points at a source note. &ldquo;Why does it think that?&rdquo;
                  always has an answer.
                </P>
                <div className="wm-rails">
                  <Details summary="See the sixteen skills">
                    <Group title="For the memory itself (4)">
                      <Row name="ingest">Files everything new: the Drop Zone and any connected email, Teams or calendar, vetted, noted, linked.</Row>
                      <Row name="lint">The health check: orphans, dead links, stale pages, duplicates, sizes. Fixes what is clear, asks about the rest.</Row>
                      <Row name="discover">From new notes outward, finds the same mechanism already in the Wiki under other words, and links them.</Row>
                      <Row name="enrich">Fills thin pages from the notes that cite them and adds the missing links. Never rewrites.</Row>
                    </Group>
                    <Group title="For the work (4)">
                      <Row name="decision-check">Five questions on one decision before it is committed: the incentive, the fast choice, the trade, reversibility, what it optimises for.</Row>
                      <Row name="ruling-docket">Every decision waiting on you, in one document: the question, the options with their trade-offs, a recommendation, what else is yours to call.</Row>
                      <Row name="insight-extraction">Mines a pile of notes or documents for the findings that would change a decision, ranked and sourced.</Row>
                      <Row name="write-it-up">Turns what it knows about a topic into a standalone document for a named reader, in your voice.</Row>
                    </Group>
                    <Group title="The rituals (3)">
                      <Row name="start-the-day">A one-screen brief: the Handover, the calendar, what is open with the people you are seeing.</Row>
                      <Row name="end-of-day">The half-hour where you talk and it files, then writes tomorrow&rsquo;s Handover.</Row>
                      <Row name="the-private-conversation">A second, shorter session that fills in what stays private and how people are handled.</Row>
                    </Group>
                    <Group title="Always on (5)">
                      <Row name="onboarding">The first session: sixteen questions, one at a time, that write the profile and seed the people who matter.</Row>
                      <Row name="never-and-always">When you say &ldquo;never do that&rdquo;, it becomes a rule in the same breath.</Row>
                      <Row name="who-is">Who someone is and where you are with them, with said, reported and inferred kept apart.</Row>
                      <Row name="draft-a-message">A draft to a named person in your voice, respecting the boundaries page. Never sends.</Row>
                      <Row name="execution-discipline">The judgement every other skill loads first: ground truth only, stop loudly, done means evidence.</Row>
                    </Group>
                  </Details>
                <Details summary="What else is in the zip">
                  <Group title="Rules (3 files)">
                    <Row name="AGENTS.md">The front door, under 700 words. Codex reads it every session. Corrections you say out loud land here as rules.</Row>
                    <Row name="filing.md">The pipeline for anything that arrives: identify, vet, weigh, distribute, note, link.</Row>
                    <Row name="onedrive-and-windows.md">The traps of the environment, by name, and what to do about each.</Row>
                  </Group>
                  <Group title="Wiki (5 sections, 3 tools pages, 1 example)">
                    <Row name="people, projects, insights">Seeded empty with a template and one filled example page, so the shape is visible.</Row>
                    <Row name="tools">Email, calendar, Teams: how each is read if connected, and what never happens (nothing sends, nothing moves).</Row>
                    <Row name="decisions">One line per decision, pointing at the page that holds the detail.</Row>
                  </Group>
                  <Group title="Engine room">
                    <Row name="handover">One live note plus an archive, one per day.</Row>
                    <Row name="logbook">One file per month, a line per step, so you can check what it did.</Row>
                    <Row name="routines.md">The three scheduled-task recipes and the one caveat.</Row>
                    <Row name="aliases.md">One person, one page: every spelling seen.</Row>
                  </Group>
                </Details>
                </div>

                <H2>Built for locked-down enterprise environments</H2>
                <Ul>
                  <li>
                    <strong>Codex is the only agent.</strong> The front door is <code>AGENTS.md</code>,
                    which Codex reads on its own, and the skills sit where Codex looks for them.
                  </li>
                  <li>
                    <strong>OneDrive, not git.</strong> No version control, so the map and the Logbook
                    are append-only, a rewritten page keeps what it replaced, and the OneDrive traps
                    are written down by name.
                  </li>
                  <li>
                    <strong>Connectors are optional.</strong> If Codex on your machine can see email,
                    Teams or the calendar, it reads them; everything else arrives through the Drop
                    Zone. Read-only either way.
                  </li>
                  <li>
                    <strong>Scheduled tasks run on your machine.</strong> The recipes are included.
                    A run that needs the folder needs the computer on and the app running, so saying
                    the words is the fallback.
                  </li>
                  <li>
                    <strong>Confidentiality is yours to set.</strong> The folder is only as private
                    as the machine and account it sits in. The boundaries page asks where the line
                    sits between your personal context and what stays in the organisation&rsquo;s
                    systems.
                  </li>
                  <li>
                    <strong>Nothing sends.</strong> It drafts, you send.
                  </li>
                </Ul>

                <H2>Feedback is appreciated</H2>
                <P>
                  This is a cut of the system I use in my own work, reshaped for your constraints. If
                  it earns a place in your day, I would like to hear where it did and where it did
                  not. A short note is plenty.
                </P>
                <P>
                  After a few weeks, the easiest way is to let the system write it. Paste this into
                  Codex inside the folder, then attach the file it produces below.
                </P>
                <CopyBlock text={FEEDBACK_PROMPT} />
                <div style={{ marginTop: '1.75rem' }}>
                  <FeedbackForm page="working-memory-7c2e91" mailto={MAILTO} />
                </div>
                <P>
                  <span style={{ display: 'block', marginTop: '1rem', fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>
                    Or email it: <A href={MAILTO}>dan@robson.studio</A>
                  </span>
                </P>

                <div style={{ marginTop: '2.5rem' }}>
                  <StyledButton href={ZIP}>Download the starter kit (zip, 56 KB)</StyledButton>
                </div>
              </div>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: 'var(--font-sans)',
        fontWeight: 400,
        fontSize: '1.5rem',
        letterSpacing: '-0.02rem',
        marginTop: '2.5rem',
        marginBottom: '0.75rem',
        color: 'var(--foreground)',
      }}
    >
      {children}
    </h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p style={{ marginBottom: '1rem' }}>{children}</p>;
}

function Ul({ children }: { children: React.ReactNode }) {
  return (
    <ul
      style={{
        listStyle: 'disc',
        paddingLeft: '1.25rem',
        marginBottom: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
      }}
    >
      {children}
    </ul>
  );
}

function A({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      style={{
        color: '#FF3C1A',
        textDecoration: 'underline',
        textUnderlineOffset: '0.1875rem',
        textDecorationThickness: '0.0625rem',
      }}
    >
      {children}
    </a>
  );
}

function Meta({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: 'var(--font-sans)',
        fontStyle: 'italic',
        color: 'rgba(36,16,19,0.5)',
        fontSize: '0.875rem',
        marginBottom: '1.5rem',
      }}
    >
      {children}
    </p>
  );
}


function Details({ summary, children }: { summary: string; children: React.ReactNode }) {
  return (
    <details className="wm-details">
      <summary
        className="wm-summary"
        style={{
          cursor: 'pointer',
          listStyle: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem',
          padding: '0.875rem 0.75rem',
          margin: '0 -0.75rem',
          fontFamily: 'var(--font-sans)',
          fontSize: '0.9375rem',
          fontWeight: 600,
          color: 'var(--foreground)',
          userSelect: 'none',
        }}
      >
        <span>{summary}</span>
        <span aria-hidden className="wm-chevron" style={{ display: 'inline-flex', color: 'var(--primary)' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </summary>
      <div style={{ padding: '0.25rem 0 1.25rem' }}>
        <table className="wm-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9375rem', lineHeight: 1.5 }}>
          {children}
        </table>
      </div>
      <style>{`
        .wm-rails { margin: 1.25rem 0 1.5rem; border-top: 1px solid var(--border); }
        .wm-details { border-bottom: 1px solid var(--border); }
        .wm-summary::-webkit-details-marker { display: none; }
        .wm-summary { transition: color 160ms ease-out; }
        .wm-summary:hover > span:first-child { color: var(--primary); }
        .wm-summary:hover .wm-chevron svg { transform: translateY(2px); }
        .wm-details[open] > .wm-summary:hover .wm-chevron svg { transform: rotate(180deg) translateY(2px); }
        .wm-table th, .wm-table td { text-align: left; vertical-align: top; padding: 0.5rem 0.75rem; border-top: 1px solid var(--border); }
        .wm-table th { background: var(--card); font-family: var(--font-sans); font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted-foreground); }
        .wm-table td:first-child { font-family: var(--font-mono); font-size: 0.8125rem; color: var(--foreground); white-space: nowrap; width: 11rem; }
        .wm-table tbody + tbody th { border-top: 1px solid var(--border); }
        @media (max-width: 640px) { .wm-table td:first-child { white-space: normal; width: 7.5rem; } }
        .wm-summary:focus-visible { outline: 2px solid var(--primary); outline-offset: 2px; }
        .wm-chevron svg { transition: transform 200ms ease-out; }
        .wm-details[open] .wm-chevron svg { transform: rotate(180deg); }
      `}</style>
    </details>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <tbody>
      <tr>
        <th colSpan={2} scope="colgroup">
          {title}
        </th>
      </tr>
      {children}
    </tbody>
  );
}

function Row({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <tr>
      <td>{name}</td>
      <td>{children}</td>
    </tr>
  );
}
