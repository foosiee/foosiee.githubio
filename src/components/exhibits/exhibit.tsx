import React from 'react';
import './exhibit.css';

/**
 * Shared plumbing for the inline SVG exhibits ("plates") that mount inside an
 * expanded entry: the framed figure on the sunken dot-grid well, its mono
 * caption, and the edge / arrowhead / cobalt-token vocabulary every plate
 * draws with. Exhibit-specific shapes stay with their figures
 * (journeyGraph, accessQuery).
 */

export function ExhibitFigure(props: {
  ordinal: string;
  /** viewBox size; also set as intrinsic width/height so `width:100%;
   * height:auto` keeps the aspect ratio inside the scroll container */
  w: number;
  h: number;
  label: string;
  caption: string;
  /** extra class on the figure — e.g. to widen `--plate-min` for a denser plate */
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <figure
      className={'ex-figure' + (props.className ? ' ' + props.className : '')}
    >
      <div className="ex-plate">
        <svg
          viewBox={`0 0 ${props.w} ${props.h}`}
          width={props.w}
          height={props.h}
          role="img"
          aria-label={props.label}
          xmlns="http://www.w3.org/2000/svg"
        >
          {props.children}
        </svg>
      </div>
      <figcaption className="ex-caption">
        <span className="ex-fig">Fig. {props.ordinal}</span>
        {props.caption}
      </figcaption>
    </figure>
  );
}

export function Edge(props: {
  d: string;
  tone?: 'done' | 'pending';
  marker: string;
}) {
  const tone = props.tone ? ' ex-edge-' + props.tone : '';
  return (
    <path
      className={'ex-edge' + tone}
      d={props.d}
      markerEnd={`url(#${props.marker})`}
    />
  );
}

export function ArrowMarker(props: { id: string; ok?: boolean }) {
  return (
    <marker
      id={props.id}
      viewBox="0 0 8 8"
      markerWidth="8"
      markerHeight="8"
      markerUnits="userSpaceOnUse"
      refX="7.5"
      refY="4"
      orient="auto"
    >
      <path
        className={props.ok ? 'ex-arr-ok' : 'ex-arr'}
        d="M0 0 L8 4 L0 8 Z"
      />
    </marker>
  );
}
