import React from 'react';
import './journeyGraph.css';
import { ArrowMarker, Edge, ExhibitFigure } from '../exhibits/exhibit';

/**
 * Journey-graph exhibits for the two Everest entries — hand-drawn SVG plates
 * in the instrument voice (mono labels, hairline nodes, one cobalt token).
 * These are illustrations of real product mechanics, not generic decoration:
 * the ML figure is a campaign as marketers composed it; the promotion figure
 * is the multi-event merge that turned Everest's tree into a DAG.
 */

const NODE_H = 66;

function Node(props: {
  x: number;
  y: number;
  w: number;
  kind: string;
  title: string;
  sub?: string;
  subTone?: 'ok';
  pending?: boolean;
}) {
  const { x, y, w } = props;
  return (
    <g className={'jg-node' + (props.pending ? ' jg-node-pending' : '')}>
      <rect x={x} y={y} width={w} height={NODE_H} rx={7} />
      <text className="ex-kind" x={x + 14} y={y + 19}>
        {props.kind}
      </text>
      <text className="jg-title" x={x + 14} y={y + 42}>
        {props.title}
      </text>
      {props.sub && (
        <text
          className={'jg-sub' + (props.subTone === 'ok' ? ' jg-sub-ok' : '')}
          x={x + 14}
          y={y + 57}
        >
          {props.sub}
        </text>
      )}
    </g>
  );
}

/**
 * ML-Driven Marketing Campaigns — the A/B loop marketers used to run by
 * hand (split at random, watch conversion, re-weight the branches),
 * closed by the ML node: attribution flows back in along the dashed
 * feedback edge, and the winning variant earns the traffic. The cobalt
 * token is one customer being allocated down the heavier branch.
 */
export function MlBranchFigure(props: { ordinal: string }) {
  return (
    <ExhibitFigure
      ordinal={props.ordinal}
      w={880}
      h={290}
      label="Campaign allocation graph: a cohort of customers who own a Kindle Paperwhite flows into an ML split node that starts at 50/50. It routes 82% of traffic to variant A (email A with a 10% offer, converting at 4.8%) and 18% to variant B (email B with a trial, converting at 1.9%). A feedback edge carries conversion attribution from the variants back into the split node."
      caption="Marketers used to run this loop by hand: split at random, watch which email-and-offer combination converted, re-weight the branches. The ML node closed the loop — attribution feeds allocation, and the winning variant earns the traffic."
    >
      <defs>
        <ArrowMarker id="ml-arr" />
      </defs>

      <Edge d="M 184 130 H 306" marker="ml-arr" />
      <Edge d="M 480 130 C 530 130, 586 63, 646 63" marker="ml-arr" />
      <Edge d="M 480 130 C 530 130, 586 197, 646 197" marker="ml-arr" />
      {/* attribution flowing back into the split node — the loop the
          marketers used to close by hand */}
      <Edge
        d="M 735 233 C 655 270, 465 262, 396 168"
        tone="pending"
        marker="ml-arr"
      />

      <text className="ex-edge-label" x={640} y={50} textAnchor="end">
        82%
      </text>
      <text className="ex-edge-label" x={640} y={216} textAnchor="end">
        18%
      </text>
      <text className="ex-note" x={560} y={274}>
        conversion attribution
      </text>

      {/* rendered before the nodes so the token ducks under each step while
          it dwells there, and only surfaces while traveling the edges */}
      <g className="ex-token">
        <circle className="ex-token-halo" r={9} />
        <circle className="ex-token-core" r={4.5} />
        <animateMotion
          dur="8s"
          repeatCount="indefinite"
          calcMode="linear"
          path="M 94 130 H 480 C 530 130, 586 63, 650 63 H 761"
          keyPoints="0;0;0.438;0.438;1;1"
          keyTimes="0;0.08;0.34;0.44;0.8;1"
        />
        <animate
          attributeName="opacity"
          values="0;1;1;0"
          keyTimes="0;0.05;0.9;1"
          dur="8s"
          repeatCount="indefinite"
        />
      </g>

      <Node
        x={8}
        y={97}
        w={176}
        kind="query"
        title="Cohort"
        sub="owns Kindle Paperwhite"
      />
      <Node
        x={310}
        y={97}
        w={170}
        kind="ml split"
        title="Allocate"
        sub="starts 50 / 50"
      />
      <Node
        x={650}
        y={30}
        w={222}
        kind="variant a"
        title="Email A · 10% off"
        sub="cvr 4.8%"
        subTone="ok"
      />
      <Node
        x={650}
        y={164}
        w={222}
        kind="variant b"
        title="Email B · trial"
        sub="cvr 1.9%"
      />
    </ExhibitFigure>
  );
}

/**
 * Lifecycle Promotions — the multi-event merge. Two prerequisite events
 * complete independently and converge on an ALL-OF gate: two edges into one
 * node, which a tree can't model. Pending work is dashed; done is green.
 */
export function PromoDagFigure(props: { ordinal: string }) {
  return (
    <ExhibitFigure
      ordinal={props.ordinal}
      w={880}
      h={260}
      label="Promotion graph: a customer enrolls, then two prerequisite events — read a Kindle book (complete) and buy any book (pending) — merge into an ALL-OF gate that releases a five dollar credit once both land."
      caption="One promotion, two prerequisites, one customer mid-journey. Events complete independently and merge back into the gate; the credit stays held until both land."
    >
      <defs>
        <ArrowMarker id="dg-arr" />
        <ArrowMarker id="dg-arr-ok" ok />
      </defs>

      <Edge d="M 158 130 C 196 130, 208 58, 246 58" marker="dg-arr" />
      <Edge d="M 158 130 C 196 130, 208 202, 246 202" marker="dg-arr" />
      <Edge
        d="M 446 58 C 484 58, 490 122, 526 122"
        tone="done"
        marker="dg-arr-ok"
      />
      <Edge
        d="M 446 202 C 484 202, 490 138, 526 138"
        tone="pending"
        marker="dg-arr"
      />
      <Edge d="M 670 130 H 708" tone="pending" marker="dg-arr" />

      <Node
        x={8}
        y={98}
        w={150}
        kind="entry"
        title="Enroll"
        sub="Kindle owners"
      />
      <Node
        x={250}
        y={25}
        w={196}
        kind="event"
        title="Read a Kindle book"
        sub="✓ complete"
        subTone="ok"
      />
      <Node
        x={250}
        y={169}
        w={196}
        kind="event"
        title="Buy any book"
        sub="pending"
        pending
      />
      <Node
        x={530}
        y={98}
        w={140}
        kind="gate"
        title="ALL OF"
        sub="1 / 2 complete"
      />
      <Node
        x={712}
        y={98}
        w={160}
        kind="promo"
        title="$5 credit"
        sub="waiting on the gate"
        pending
      />

      <text className="ex-note" x={604} y={222}>
        two edges in, one gate — a tree can’t do that
      </text>
    </ExhibitFigure>
  );
}
