import React from 'react';
import './accessQuery.css';
import { ArrowMarker, Edge, ExhibitFigure } from '../exhibits/exhibit';

/**
 * AVP Access Queries — the partial-evaluation pipeline as an instrument
 * reading. A request with the resource left unknown enters the policy store;
 * type-aware partial evaluation (cedar RFC 95) strips everything the request
 * already satisfies and leaves plain, well-typed residual policies; the
 * permit residuals compile to one indexed query that narrows millions of
 * rows to a handful of candidates; full Cedar evaluation then authorizes just
 * those. The plate's one cobalt element is the request token traveling the
 * pipe. Numbers are illustrative; the mechanics are the real design.
 */

/** A code line on a panel; xml:space keeps the indent/alignment spaces. */
function Code(props: {
  x: number;
  y: number;
  dim?: boolean;
  children: React.ReactNode;
}) {
  return (
    <text
      className={'aq-code' + (props.dim ? ' aq-dim' : '')}
      x={props.x}
      y={props.y}
      xmlSpace="preserve"
    >
      {props.children}
    </text>
  );
}

const Kw = (props: { children: React.ReactNode }) => (
  <tspan className="aq-kw">{props.children}</tspan>
);
/** the free variable — the whole trick — set in the structural violet */
const Res = () => <tspan className="aq-unk">resource</tspan>;

function Panel(props: {
  x: number;
  y: number;
  w: number;
  h: number;
  kind: string;
  children: React.ReactNode;
}) {
  const { x, y, w, h } = props;
  return (
    <g className="aq-panel">
      <rect x={x} y={y} width={w} height={h} rx={7} />
      <text className="ex-kind" x={x + 13} y={y + 17}>
        {props.kind}
      </text>
      {props.children}
    </g>
  );
}

export function AccessQueryFigure(props: { ordinal: string }) {
  return (
    <ExhibitFigure
      className="aq-figure"
      ordinal={props.ordinal}
      w={880}
      h={472}
      label="Pipeline: an access request for principal alice with the resource left unknown enters a store of four Cedar policies. Type-aware partial evaluation drops the MFA forbid (already satisfied by the request) and leaves plain residual policies over the unknown resource: owner equals alice, isPublic, and a legalHold forbid that isn't indexable. The permit residuals compile to one SQL query — SELECT id FROM documents WHERE owner = 'alice' OR is_public = true — which narrows 2,481,904 documents to 38 candidate rows. Full Cedar evaluation then authorizes each candidate: 36 allowed, 2 denied on legal hold."
      caption="An access query asks “what can alice view?”, not “can alice view this?”. The resource stays unknown: type-aware partial evaluation strips every policy the request already satisfies and leaves well-typed residual policies, the permit residuals compile to one indexed query, and full Cedar evaluation runs on the 38 rows that come back — not the 2,481,904 the table started with. Production compiles residuals to Valkey lookups; SQL shown because everyone reads SQL."
    >
      <defs>
        <ArrowMarker id="aq-arr" />
      </defs>

      {/* ── edges ─────────────────────────────────────────────── */}
      <Edge d="M 204 124 H 266" marker="aq-arr" />
      <Edge d="M 536 124 H 598" marker="aq-arr" />
      <text className="ex-edge-label" x={568} y={104} textAnchor="middle">
        partial
      </text>
      <text className="ex-edge-label" x={568} y={115} textAnchor="middle">
        eval
      </text>

      {/* the return carriage: residuals sweep down into the compiler */}
      <Edge
        d="M 736 174 V 264 Q 736 272 728 272 H 152 Q 144 272 144 280 V 314"
        marker="aq-arr"
      />
      <text className="ex-edge-label" x={440} y={262} textAnchor="middle">
        compile — permit residuals become the where clause
      </text>

      <Edge d="M 280 378 H 344" marker="aq-arr" />
      <text className="ex-edge-label" x={312} y={366} textAnchor="middle">
        execute
      </text>
      <Edge d="M 576 378 H 640" marker="aq-arr" />
      <text className="ex-edge-label" x={608} y={366} textAnchor="middle">
        authorize
      </text>

      {/* the request token — rendered before the panels so it ducks under
          each stage and only surfaces on the wires between them */}
      <g className="ex-token">
        <circle className="ex-token-halo" r={9} />
        <circle className="ex-token-core" r={4.5} />
        <animateMotion
          dur="12s"
          repeatCount="indefinite"
          calcMode="linear"
          path="M -8 124 H 736 V 264 Q 736 272 728 272 H 152 Q 144 272 144 280 V 370 Q 144 378 152 378 H 890"
          keyPoints="0;0.176;0.176;0.66;0.66;1"
          keyTimes="0;0.16;0.26;0.6;0.7;1"
        />
        <animate
          attributeName="opacity"
          values="0;1;1;0"
          keyTimes="0;0.04;0.93;1"
          dur="12s"
          repeatCount="indefinite"
        />
      </g>

      {/* ── stage 1: the request, resource unknown ───────────────── */}
      <Panel x={8} y={57} w={196} h={134} kind="request">
        <text className="ex-kind" x={21} y={94}>
          principal
        </text>
        <Code x={80} y={94}>
          User::"alice"
        </Code>
        <text className="ex-kind" x={21} y={111}>
          action
        </text>
        <Code x={80} y={111}>
          Action::"viewDoc"
        </Code>
        <text className="ex-kind" x={21} y={128}>
          context
        </text>
        <Code x={80} y={128}>
          {'{ mfa: true }'}
        </Code>
        <text className="ex-kind" x={21} y={145}>
          resource
        </text>
        <Code x={80} y={145}>
          <tspan className="aq-unk">unknown</tspan>
        </Code>
        <line className="aq-unk-line" x1={80} y1={149} x2={124} y2={149} />
        <text className="aq-com" x={21} y={168}>
          "what can alice view?"
        </text>
      </Panel>

      {/* ── stage 2: the policy store ─────────────────────────────── */}
      <Panel x={272} y={28} w={264} h={208} kind="policy store · 4 policies">
        <Code x={285} y={64}>
          <Kw>permit</Kw> (principal, action, resource)
        </Code>
        <Code x={285} y={78.5}>
          <Kw>when</Kw> {'{ resource.owner == principal };'}
        </Code>
        <Code x={285} y={96.5}>
          <Kw>permit</Kw> (principal, action, resource)
        </Code>
        <Code x={285} y={111}>
          <Kw>when</Kw> {'{ resource.isPublic };'}
        </Code>
        <Code x={285} y={129.5}>
          <Kw>forbid</Kw> (principal, action, resource)
        </Code>
        <Code x={285} y={144}>
          <Kw>when</Kw> {'{ resource.legalHold };'}
        </Code>
        {/* satisfied by the known context — partial evaluation drops it */}
        <Code x={285} y={162.5} dim>
          <Kw>forbid</Kw> (principal, action, resource)
        </Code>
        <Code x={285} y={177} dim>
          <Kw>unless</Kw> {'{ context.mfa };'}
        </Code>
        <line className="aq-strike" x1={285} y1={159} x2={512} y2={159} />
        <line className="aq-strike" x1={285} y1={173.5} x2={430} y2={173.5} />
        <text className="aq-note-ok" x={285} y={196}>
          ✓ satisfied by the request — dropped
        </text>
      </Panel>

      {/* ── stage 3: what evaluation couldn't decide yet — TPE leaves
          plain, well-typed policies over the free resource variable ── */}
      <Panel
        x={604}
        y={39}
        w={264}
        h={132}
        kind="typed residuals · resource free"
      >
        <Code x={617} y={75}>
          <Kw>permit</Kw> <Kw>when</Kw>
        </Code>
        <text className="aq-tag" x={855} y={75} textAnchor="end">
          → sql
        </text>
        <Code x={617} y={89.5}>
          {'  { '}
          <Res />
          {'.owner == User::"alice" };'}
        </Code>
        <Code x={617} y={107.5}>
          <Kw>permit</Kw> <Kw>when</Kw>
        </Code>
        <text className="aq-tag" x={855} y={107.5} textAnchor="end">
          → sql
        </text>
        <Code x={617} y={122}>
          {'  { '}
          <Res />
          {'.isPublic };'}
        </Code>
        <Code x={617} y={140}>
          <Kw>forbid</Kw> <Kw>when</Kw>
        </Code>
        <text className="aq-tag" x={855} y={140} textAnchor="end">
          → recheck
        </text>
        <Code x={617} y={154.5}>
          {'  { '}
          <Res />
          {'.legalHold };'}
        </Code>
      </Panel>

      {/* ── stage 4: the compiled query ───────────────────────────── */}
      <Panel x={8} y={322} w={272} h={112} kind="compiled query">
        <Code x={21} y={358}>
          <Kw>SELECT</Kw> id <Kw>FROM</Kw> documents
        </Code>
        <Code x={21} y={373}>
          <Kw>WHERE</Kw>
          {"  owner = 'alice'"}
        </Code>
        <Code x={21} y={388}>
          {'   '}
          <Kw>OR</Kw>
          {'  is_public = true;'}
        </Code>
        <text className="aq-com" x={21} y={410}>
          -- candidates, not decisions
        </text>
      </Panel>

      {/* ── stage 5: the narrowing ────────────────────────────────── */}
      <Panel x={352} y={322} w={224} h={112} kind="result set">
        <text className="aq-big" x={365} y={376}>
          38<tspan className="aq-big-unit"> rows</tspan>
        </text>
        <text className="aq-sub" x={365} y={396}>
          of 2,481,904 documents
        </text>
        <text className="aq-sub" x={365} y={412}>
          one indexed query — no scan
        </text>
      </Panel>

      {/* ── stage 6: cedar decides ────────────────────────────────── */}
      <Panel x={648} y={322} w={224} h={112} kind="cedar · is_authorized">
        <text className="aq-big-sm" x={661} y={374}>
          <tspan className="aq-allow">36 ALLOW</tspan>
          <tspan className="aq-dot"> · </tspan>
          <tspan className="aq-deny">2 DENY</tspan>
        </text>
        <text className="aq-sub" x={661} y={396}>
          full policies, full attributes
        </text>
        <text className="aq-sub" x={661} y={412}>
          2 denied — legal hold
        </text>
      </Panel>

      <text className="ex-note" x={440} y={458}>
        the index narrows; cedar decides
      </text>
    </ExhibitFigure>
  );
}
