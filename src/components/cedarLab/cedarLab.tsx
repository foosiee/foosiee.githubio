import React, { useEffect, useRef, useState } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import type {
  AuthorizationAnswer,
  CheckParseAnswer,
  DetailedError,
  FormattingAnswer,
  ValidationAnswer,
} from '@cedar-policy/cedar-wasm';
import type * as Monaco from 'monaco-editor';

import { configureCedarMonaco } from '../../lib/cedarMonaco';
import {
  registerCedarEditorService,
  updateCedarDiagnostics,
} from '../../lib/cedarEditorService';
import './cedarLab.css';

type CedarModule = typeof import('@cedar-policy/cedar-wasm');
type CedarDocumentId = 'schema' | 'policies' | 'entities' | 'request';

const SAMPLE_SCHEMA = `entity User;
entity Folder;
entity Project in [Folder] = {
  owner: User,
  isPublic: Bool
};

action "view" appliesTo {
  principal: [User],
  resource: [Project]
};`;

const SAMPLE_POLICIES = `permit (
  principal,
  action == Action::"view",
  resource
)
when {
  resource.isPublic || resource.owner == principal
};`;

const SAMPLE_ENTITIES = `[
  {
    "uid": { "type": "User", "id": "alice" },
    "attrs": {},
    "parents": []
  },
  {
    "uid": { "type": "Folder", "id": "portfolio" },
    "attrs": {},
    "parents": []
  },
  {
    "uid": { "type": "Project", "id": "cedar-site" },
    "attrs": {
      "owner": { "__entity": { "type": "User", "id": "alice" } },
      "isPublic": false
    },
    "parents": [{ "type": "Folder", "id": "portfolio" }]
  },
  {
    "uid": { "type": "Action", "id": "view" },
    "attrs": {},
    "parents": []
  }
]`;

const SAMPLE_REQUEST = `{
  "principal": { "type": "User", "id": "alice" },
  "action": { "type": "Action", "id": "view" },
  "resource": { "type": "Project", "id": "cedar-site" },
  "context": {}
}`;

function singleError(message: string, help?: string | null): DetailedError[] {
  return [
    {
      message,
      help: help ?? null,
      code: null,
      url: null,
      severity: 'error',
      sourceLocations: [],
      related: [],
    },
  ];
}

function ErrorList(props: { title: string; errors: DetailedError[] }) {
  return (
    <div className="cedar-error-block">
      <p className="cedar-section-label">{props.title}</p>
      <div className="cedar-error-list">
        {props.errors.map((error, index) => (
          <article
            className="cedar-error-item"
            key={`${error.message}-${error.code ?? 'none'}-${index}`}
          >
            <p>{error.message}</p>
            {error.help ? <small>{error.help}</small> : null}
          </article>
        ))}
      </div>
    </div>
  );
}

function StatusChip(props: { label: string; tone: 'good' | 'bad' | 'muted' }) {
  return (
    <span className={`cedar-status-chip cedar-status-${props.tone}`}>
      {props.label}
    </span>
  );
}

function CodeEditor(props: {
  label: string;
  language: 'cedar' | 'json';
  path: string;
  value: string;
  onChange: (value: string) => void;
  height?: number;
  onMount?: (
    editor: Monaco.editor.IStandaloneCodeEditor,
    monaco: typeof Monaco
  ) => void;
  onUnmount?: (
    editor: Monaco.editor.IStandaloneCodeEditor,
    monaco: typeof Monaco
  ) => void;
}) {
  const handleMount: OnMount = (editor, monaco) => {
    configureCedarMonaco(monaco as typeof Monaco);
    monaco.editor.setTheme('cedar-os');
    props.onMount?.(
      editor as Monaco.editor.IStandaloneCodeEditor,
      monaco as typeof Monaco
    );
  };

  return (
    <label className="cedar-editor-block">
      <span className="cedar-section-label">{props.label}</span>
      <div className="cedar-monaco-shell">
        <Editor
          beforeMount={(monaco) => {
            configureCedarMonaco(monaco as typeof Monaco);
          }}
          onMount={handleMount}
          language={props.language}
          path={props.path}
          value={props.value}
          onChange={(value) => props.onChange(value ?? '')}
          height={props.height ?? 260}
          onUnmount={props.onUnmount}
          options={{
            automaticLayout: true,
            minimap: { enabled: false },
            fontFamily: 'IBM Plex Mono, Courier New, monospace',
            fontSize: 14,
            scrollBeyondLastLine: false,
            roundedSelection: false,
            wordWrap: 'on',
            padding: { top: 12, bottom: 12 },
            lineNumbersMinChars: 3,
            renderLineHighlight: 'line',
            tabSize: 2,
          }}
          theme="cedar-os"
        />
      </div>
    </label>
  );
}

export default function CedarLab() {
  const monacoRef = useRef<typeof Monaco | null>(null);
  const schemaEditorRef = useRef<Monaco.editor.IStandaloneCodeEditor | null>(
    null
  );
  const policyEditorRef = useRef<Monaco.editor.IStandaloneCodeEditor | null>(
    null
  );
  const [cedar, setCedar] = useState<CedarModule | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [languageServiceError, setLanguageServiceError] = useState<
    string | null
  >(null);
  const [schemaText, setSchemaText] = useState(SAMPLE_SCHEMA);
  const [policyText, setPolicyText] = useState(SAMPLE_POLICIES);
  const [entitiesText, setEntitiesText] = useState(SAMPLE_ENTITIES);
  const [requestText, setRequestText] = useState(SAMPLE_REQUEST);
  const [activeDocument, setActiveDocument] = useState<CedarDocumentId>(
    'policies'
  );
  const [schemaParse, setSchemaParse] = useState<CheckParseAnswer | null>(null);
  const [policyParse, setPolicyParse] = useState<CheckParseAnswer | null>(null);
  const [validation, setValidation] = useState<ValidationAnswer | null>(null);
  const [
    authorization,
    setAuthorization,
  ] = useState<AuthorizationAnswer | null>(null);
  const [authorizationErrors, setAuthorizationErrors] = useState<
    DetailedError[]
  >([]);
  const [runtimeVersion, setRuntimeVersion] = useState<string | null>(null);
  const [sdkVersion, setSdkVersion] = useState<string | null>(null);

  const analyzeInputs = (
    module: CedarModule,
    nextSchemaText: string,
    nextPolicyText: string
  ) => {
    const nextSchemaParse = module.checkParseSchema(nextSchemaText);
    const nextPolicyParse = module.checkParsePolicySet({
      staticPolicies: nextPolicyText,
    });

    setSchemaParse(nextSchemaParse);
    setPolicyParse(nextPolicyParse);
    setAuthorization(null);
    setAuthorizationErrors([]);

    if (
      nextSchemaParse.type === 'success' &&
      nextPolicyParse.type === 'success'
    ) {
      setValidation(
        module.validate({
          schema: nextSchemaText,
          policies: { staticPolicies: nextPolicyText },
          validationSettings: { mode: 'strict' },
        })
      );
    } else {
      setValidation(null);
    }
  };

  useEffect(() => {
    let active = true;

    import('@cedar-policy/cedar-wasm')
      .then((module) => {
        if (!active) {
          return;
        }

        setCedar(module);
        setRuntimeVersion(module.getCedarVersion());
        setSdkVersion(module.getCedarSDKVersion());
        analyzeInputs(module, SAMPLE_SCHEMA, SAMPLE_POLICIES);
      })
      .catch((error: unknown) => {
        if (!active) {
          return;
        }

        const message =
          error instanceof Error ? error.message : 'Failed to load Cedar WASM.';
        setLoadError(message);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const monaco = monacoRef.current;
    const schemaModel = schemaEditorRef.current?.getModel();
    const policyModel = policyEditorRef.current?.getModel();

    if (!monaco || !schemaModel || !policyModel) {
      return;
    }

    let cancelled = false;
    const timer = window.setTimeout(() => {
      Promise.all([
        updateCedarDiagnostics(monaco, schemaModel, {
          getSchemaText: () => schemaText,
        }),
        updateCedarDiagnostics(monaco, policyModel, {
          getSchemaText: () => schemaText,
        }),
      ])
        .then(() => {
          if (!cancelled) {
            setLanguageServiceError(null);
          }
        })
        .catch((error: unknown) => {
          if (!cancelled) {
            setLanguageServiceError(
              error instanceof Error
                ? error.message
                : 'Failed to load Cedar language service.'
            );
          }
        });
    }, 180);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [policyText, schemaText]);

  const runAnalysis = () => {
    if (!cedar) {
      return;
    }

    analyzeInputs(cedar, schemaText, policyText);
  };

  const formatPolicies = () => {
    if (!cedar) {
      return;
    }

    const result: FormattingAnswer = cedar.formatPolicies({
      policyText,
      lineWidth: 80,
      indentWidth: 2,
    });

    if (result.type === 'success') {
      setPolicyText(result.formatted_policy);
      analyzeInputs(cedar, schemaText, result.formatted_policy);
      return;
    }

    analyzeInputs(cedar, schemaText, policyText);
  };

  const resetSamples = () => {
    setSchemaText(SAMPLE_SCHEMA);
    setPolicyText(SAMPLE_POLICIES);

    if (cedar) {
      analyzeInputs(cedar, SAMPLE_SCHEMA, SAMPLE_POLICIES);
      return;
    }

    setSchemaParse(null);
    setPolicyParse(null);
    setValidation(null);
  };

  const validationErrors =
    validation && validation.type === 'success'
      ? validation.validationErrors
      : [];
  const validationWarnings =
    validation && validation.type === 'success'
      ? validation.validationWarnings
      : [];

  const cedarDocuments: Record<
    CedarDocumentId,
    {
      label: string;
      language: 'cedar' | 'json';
      path: string;
      value: string;
      onChange: (value: string) => void;
      help: string;
      canHover: boolean;
    }
  > = {
    schema: {
      label: 'Schema.cedar',
      language: 'cedar' as const,
      path: 'cedar://workspace/schema.cedar',
      value: schemaText,
      onChange: setSchemaText,
      help: 'Define entity types, actions, and relationships.',
      canHover: false,
    },
    policies: {
      label: 'Policies.cedar',
      language: 'cedar' as const,
      path: 'cedar://workspace/policies.cedar',
      value: policyText,
      onChange: setPolicyText,
      help: 'Hover and autocomplete are wired here through the Cedar LSP.',
      canHover: true,
    },
    entities: {
      label: 'Entities.json',
      language: 'json' as const,
      path: 'cedar://workspace/entities.json',
      value: entitiesText,
      onChange: setEntitiesText,
      help: 'Entity graph used by the authorization runtime.',
      canHover: false,
    },
    request: {
      label: 'Request.json',
      language: 'json' as const,
      path: 'cedar://workspace/request.json',
      value: requestText,
      onChange: setRequestText,
      help: 'Principal, action, resource, and context for evaluation.',
      canHover: false,
    },
  };
  const cedarDocumentOrder: CedarDocumentId[] = [
    'schema',
    'policies',
    'entities',
    'request',
  ];
  const activeDocumentConfig = cedarDocuments[activeDocument];

  return (
    <div className="cedar-lab">
      <div className="cedar-toolbar">
        <div>
          <p className="prompt-line">C:\&gt; launch cedar-lab.exe</p>
          <p className="cedar-runtime-copy">
            In-browser Cedar playground running through WASM.
          </p>
        </div>
        <div className="cedar-toolbar-actions">
          <button className="win-button primary" onClick={runAnalysis}>
            Analyze
          </button>
          <button className="win-button" onClick={formatPolicies}>
            Format
          </button>
          <button className="win-button" onClick={resetSamples}>
            Reset
          </button>
        </div>
      </div>

      <div className="cedar-meta">
        <StatusChip
          label={
            cedar ? 'Runtime loaded' : loadError ? 'Load failed' : 'Loading'
          }
          tone={cedar ? 'good' : loadError ? 'bad' : 'muted'}
        />
        {runtimeVersion ? (
          <span className="cedar-meta-text">Lang {runtimeVersion}</span>
        ) : null}
        {sdkVersion ? (
          <span className="cedar-meta-text">SDK {sdkVersion}</span>
        ) : null}
      </div>

      {loadError ? (
        <ErrorList title="Runtime Error" errors={singleError(loadError)} />
      ) : null}
      {languageServiceError ? (
        <ErrorList
          title="Language Service Error"
          errors={singleError(languageServiceError)}
        />
      ) : null}

      <div className="cedar-workspace">
        <div className="cedar-tab-bar" role="tablist" aria-label="Cedar files">
          {cedarDocumentOrder.map((id) => (
            <button
              key={id}
              role="tab"
              aria-selected={activeDocument === id}
              className={`cedar-tab${activeDocument === id ? ' active' : ''}`}
              onClick={() => setActiveDocument(id)}
            >
              {cedarDocuments[id].label}
            </button>
          ))}
        </div>

        <div className="cedar-workspace-grid">
          <div className="cedar-editor-stack">
            {cedarDocumentOrder.map((id) => {
              const document = cedarDocuments[id];

              return (
                <div
                  key={id}
                  className={`cedar-document-panel${
                    activeDocument === id ? ' active' : ''
                  }`}
                >
                  <CodeEditor
                    label={document.label}
                    language={document.language}
                    path={document.path}
                    value={document.value}
                    onChange={document.onChange}
                    height={360}
                    onMount={(editor, monaco) => {
                      monacoRef.current = monaco;

                      if (id === 'schema') {
                        schemaEditorRef.current = editor;
                      }

                      if (id === 'policies') {
                        policyEditorRef.current = editor;
                      }

                      registerCedarEditorService(monaco, {
                        getSchemaText: () =>
                          schemaEditorRef.current?.getValue() ?? '',
                      });
                    }}
                    onUnmount={(editor) => {
                      if (schemaEditorRef.current === editor) {
                        schemaEditorRef.current = null;
                      }

                      if (policyEditorRef.current === editor) {
                        policyEditorRef.current = null;
                      }
                    }}
                  />
                </div>
              );
            })}
          </div>

          <aside className="cedar-lsp-panel">
            <p className="cedar-section-label">Editor Surface</p>
            <p className="cedar-runtime-copy">{activeDocumentConfig.help}</p>
            <div className="cedar-lsp-feature-grid">
              <div className="mini-panel">
                <p className="skills-status-label">Hover</p>
                <strong className="skills-status-value">
                  {activeDocumentConfig.canHover ? 'Available' : 'Policy-only'}
                </strong>
              </div>
              <div className="mini-panel">
                <p className="skills-status-label">Autocomplete</p>
                <strong className="skills-status-value">Live</strong>
              </div>
              <div className="mini-panel">
                <p className="skills-status-label">Diagnostics</p>
                <strong className="skills-status-value">Live markers</strong>
              </div>
            </div>
            <div className="cedar-notes">
              <p className="cedar-section-label">What to Try</p>
              <ul className="detail-list compact">
                <li>Hover over identifiers in `Policies.cedar`.</li>
                <li>Trigger autocomplete while editing Cedar files.</li>
                <li>Switch tabs to see parse and validation state update.</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>

      <div className="cedar-results">
        <div className="cedar-result-card">
          <div className="cedar-result-header">
            <p className="cedar-section-label">Parse Status</p>
            <div className="cedar-chip-row">
              <StatusChip
                label={
                  schemaParse
                    ? schemaParse.type === 'success'
                      ? 'Schema OK'
                      : 'Schema Error'
                    : 'Schema idle'
                }
                tone={
                  !schemaParse
                    ? 'muted'
                    : schemaParse.type === 'success'
                    ? 'good'
                    : 'bad'
                }
              />
              <StatusChip
                label={
                  policyParse
                    ? policyParse.type === 'success'
                      ? 'Policies OK'
                      : 'Policies Error'
                    : 'Policies idle'
                }
                tone={
                  !policyParse
                    ? 'muted'
                    : policyParse.type === 'success'
                    ? 'good'
                    : 'bad'
                }
              />
            </div>
          </div>
          {schemaParse && schemaParse.type === 'failure' ? (
            <ErrorList title="Schema Errors" errors={schemaParse.errors} />
          ) : null}
          {policyParse && policyParse.type === 'failure' ? (
            <ErrorList title="Policy Errors" errors={policyParse.errors} />
          ) : null}
        </div>

        <div className="cedar-result-card">
          <div className="cedar-result-header">
            <p className="cedar-section-label">Validation</p>
            <StatusChip
              label={
                validation
                  ? validation.type === 'success' &&
                    validationErrors.length === 0 &&
                    validationWarnings.length === 0
                    ? 'Strict validation clean'
                    : validation.type === 'success'
                    ? 'Validation findings'
                    : 'Validation failed'
                  : 'Validation idle'
              }
              tone={
                !validation
                  ? 'muted'
                  : validation.type === 'success' &&
                    validationErrors.length === 0 &&
                    validationWarnings.length === 0
                  ? 'good'
                  : 'bad'
              }
            />
          </div>
          {validation && validation.type === 'failure' ? (
            <ErrorList title="Validation Failures" errors={validation.errors} />
          ) : null}
          {validationErrors.length > 0 ? (
            <ErrorList
              title="Validation Errors"
              errors={validationErrors.map((item) => item.error)}
            />
          ) : null}
          {validationWarnings.length > 0 ? (
            <ErrorList
              title="Validation Warnings"
              errors={validationWarnings.map((item) => item.error)}
            />
          ) : null}
        </div>
      </div>

      <div className="cedar-results cedar-results-bottom cedar-results-single">
        <div className="cedar-result-card cedar-notes">
          <p className="cedar-section-label">Why This Matters</p>
          <p>
            This window is already running Cedar directly in the browser through
            WASM. The editor now exposes the Cedar files as tabs and gives the
            language-server work a proper demo surface instead of hiding it
            inside a cramped two-column layout.
          </p>
          <ul className="detail-list compact">
            <li>Real Cedar parse checks</li>
            <li>Real Cedar formatting</li>
            <li>Strict schema validation</li>
            <li>Live authorization evaluation</li>
          </ul>
        </div>
      </div>

      <div className="cedar-toolbar cedar-auth-toolbar">
        <div>
          <p className="prompt-line">C:\&gt; run authorize</p>
          <p className="cedar-runtime-copy">
            Evaluate a concrete Cedar request against the current schema,
            policies, entities, and request context.
          </p>
        </div>
        <div className="cedar-toolbar-actions">
          <button
            className="win-button primary"
            onClick={() => {
              if (!cedar) {
                return;
              }

              try {
                const parsedEntities = JSON.parse(entitiesText);
                const parsedRequest = JSON.parse(requestText) as {
                  principal: { type: string; id: string };
                  action: { type: string; id: string };
                  resource: { type: string; id: string };
                  context?: Record<string, unknown>;
                };

                setAuthorizationErrors([]);
                setAuthorization(
                  cedar.isAuthorized({
                    schema: schemaText,
                    policies: { staticPolicies: policyText },
                    entities: parsedEntities,
                    principal: parsedRequest.principal,
                    action: parsedRequest.action,
                    resource: parsedRequest.resource,
                    context: parsedRequest.context ?? {},
                    validateRequest: true,
                  })
                );
              } catch (error) {
                setAuthorization(null);
                setAuthorizationErrors(
                  singleError(
                    'Failed to parse entities.json or request.json.',
                    error instanceof Error ? error.message : null
                  )
                );
              }
            }}
          >
            Evaluate
          </button>
        </div>
      </div>

      <div className="cedar-results">
        <div className="cedar-result-card">
          <div className="cedar-result-header">
            <p className="cedar-section-label">Authorization Result</p>
            <StatusChip
              label={
                authorization
                  ? authorization.type === 'success'
                    ? authorization.response.decision.toUpperCase()
                    : 'Authorization failed'
                  : authorizationErrors.length > 0
                  ? 'Input error'
                  : 'Not evaluated'
              }
              tone={
                authorization
                  ? authorization.type === 'success' &&
                    authorization.response.decision === 'allow'
                    ? 'good'
                    : 'bad'
                  : authorizationErrors.length > 0
                  ? 'bad'
                  : 'muted'
              }
            />
          </div>
          {authorizationErrors.length > 0 ? (
            <ErrorList title="Input Errors" errors={authorizationErrors} />
          ) : null}
          {authorization && authorization.type === 'failure' ? (
            <ErrorList
              title="Authorization Failures"
              errors={authorization.errors}
            />
          ) : null}
          {authorization && authorization.type === 'success' ? (
            <div className="cedar-auth-summary">
              <p>
                Decision: <strong>{authorization.response.decision}</strong>
              </p>
              <p>
                Matched policies:{' '}
                <strong>
                  {authorization.response.diagnostics.reason.length > 0
                    ? authorization.response.diagnostics.reason.join(', ')
                    : 'none'}
                </strong>
              </p>
            </div>
          ) : null}
        </div>

        <div className="cedar-result-card">
          <div className="cedar-result-header">
            <p className="cedar-section-label">Engine Diagnostics</p>
            <StatusChip
              label={
                authorization && authorization.type === 'success'
                  ? authorization.response.diagnostics.errors.length > 0
                    ? 'Runtime errors'
                    : 'No runtime errors'
                  : 'Idle'
              }
              tone={
                authorization && authorization.type === 'success'
                  ? authorization.response.diagnostics.errors.length > 0
                    ? 'bad'
                    : 'good'
                  : 'muted'
              }
            />
          </div>
          {authorization &&
          authorization.type === 'success' &&
          authorization.response.diagnostics.errors.length > 0 ? (
            <ErrorList
              title="Policy Runtime Errors"
              errors={authorization.response.diagnostics.errors.map(
                (item) => item.error
              )}
            />
          ) : (
            <p className="cedar-runtime-copy">
              Cedar runtime diagnostics will appear here after evaluation.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
