import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  MousePointer2,
  Lightbulb,
  SlidersHorizontal,
} from "lucide-react";

const accent = "#A855F7";
const accentLight = "#F3E8FF";

const screens = [
  { id: "feature1-main", title: "Feature 1 · Engagement Scores" },
  { id: "feature1-compare", title: "Feature 1 · Compare Trials" },
  { id: "feature2-main", title: "Feature 2 · Behavior Tracking" },
  { id: "feature2-compare", title: "Feature 2 · Compare Signals" },
];

const feature1Data = [
  { label: "Interest", t1: 6.2, t2: 6.0, t3: 4.7 },
  { label: "Discovery", t1: 6.0, t2: 5.9, t3: 4.8 },
  { label: "Attention", t1: 5.9, t2: 5.4, t3: 4.2 },
  { label: "Creativity", t1: 3.7, t2: 3.6, t3: 3.1 },
];

const trialData = [
  {
    trial: "Trial 1",
    viz: "Record Breaking Coasters",
    score: 123.92,
    time: 64.47,
  },
  { trial: "Trial 2", viz: "Analysis of Queen", score: 123.2, time: 47.4 },
  {
    trial: "Trial 3",
    viz: "Women in Computer Science",
    score: 104.5,
    time: 43.22,
  },
];

// ─── Primitive replacements ───────────────────────────────────────────────────

function Card({
  children,
  style = {},
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: 16,
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function CardHeader({ children }: { children: React.ReactNode }) {
  return <div style={{ padding: "24px 24px 0 24px" }}>{children}</div>;
}

function CardTitle({
  children,
  size = "xl",
}: {
  children: React.ReactNode;
  size?: string;
}) {
  const fs = size === "2xl" ? 24 : size === "lg" ? 20 : 18;
  return (
    <div
      style={{
        fontSize: fs,
        fontWeight: 600,
        color: "#111827",
        marginBottom: 4,
      }}
    >
      {children}
    </div>
  );
}

function CardDescription({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.6 }}>
      {children}
    </div>
  );
}

function CardContent({ children }: { children: React.ReactNode }) {
  return <div style={{ padding: 24 }}>{children}</div>;
}

function Badge({
  children,
  variant = "primary",
}: {
  children: React.ReactNode;
  variant?: string;
}) {
  const isPrimary = variant === "primary";
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 10px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 500,
        background: isPrimary ? accent : "#f9fafb",
        color: isPrimary ? "#fff" : "#374151",
        border: isPrimary ? "none" : "1px solid #e5e7eb",
        marginRight: 6,
        marginBottom: 4,
      }}
    >
      {children}
    </span>
  );
}

function Btn({
  children,
  onClick,
  fullWidth = false,
  outline = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  fullWidth?: boolean;
  outline?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "9px 18px",
        borderRadius: 10,
        fontSize: 14,
        fontWeight: 500,
        cursor: "pointer",
        border: outline ? "1px solid #d1d5db" : "none",
        background: outline ? "#fff" : accent,
        color: outline ? "#374151" : "#fff",
        width: fullWidth ? "100%" : undefined,
        justifyContent: fullWidth ? "center" : undefined,
        transition: "opacity 0.15s",
      }}
    >
      {children}
    </button>
  );
}

// ─── Shared ───────────────────────────────────────────────────────────────────

function ProgressBar({
  value,
  max = 7,
  small = false,
}: {
  value: number;
  max?: number;
  small?: boolean;
}) {
  const h = small ? 6 : 10;
  return (
    <div
      style={{
        width: "100%",
        height: h,
        borderRadius: 999,
        background: "#e5e7eb",
      }}
    >
      <div
        style={{
          width: `${(value / max) * 100}%`,
          height: h,
          borderRadius: 999,
          background: accent,
        }}
      />
    </div>
  );
}

function ScreenNav({
  screenIndex,
  setScreenIndex,
}: {
  screenIndex: number;
  setScreenIndex: (i: number) => void;
}) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {screens.map((screen, i) => (
        <button
          key={screen.id}
          onClick={() => setScreenIndex(i)}
          style={{
            borderRadius: 999,
            border: i === screenIndex ? "none" : "1px solid #d1d5db",
            padding: "7px 16px",
            fontSize: 13,
            cursor: "pointer",
            background: i === screenIndex ? accent : "#fff",
            color: i === screenIndex ? "#fff" : "#374151",
            transition: "all 0.15s",
          }}
        >
          {screen.title}
        </button>
      ))}
    </div>
  );
}

// ─── Feature 1 Main ───────────────────────────────────────────────────────────

function Feature1Main({
  selectedMetric,
  setSelectedMetric,
  setScreenIndex,
}: any) {
  const current =
    feature1Data.find((item) => item.label === selectedMetric) ||
    feature1Data[0];

  return (
    <div style={{ display: "grid", gap: 24, gridTemplateColumns: "1fr 360px" }}>
      <Card>
        <CardHeader>
          <div>
            <Badge>Feature 1</Badge>
          </div>
          <div style={{ marginTop: 12 }}>
            <CardTitle size="2xl">Engagement Score Screen</CardTitle>
          </div>
          <CardDescription>
            This screen shows four engagement dimensions from the paper using a
            simple card and bar layout.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            style={{
              display: "grid",
              gap: 16,
              gridTemplateColumns: "1fr 1fr",
              marginBottom: 20,
            }}
          >
            {feature1Data.map((item) => (
              <button
                key={item.label}
                onClick={() => setSelectedMetric(item.label)}
                style={{
                  borderRadius: 16,
                  border:
                    selectedMetric === item.label
                      ? "1.5px solid #111827"
                      : "1px solid #e5e7eb",
                  padding: 16,
                  textAlign: "left",
                  cursor: "pointer",
                  background:
                    selectedMetric === item.label ? "#f9fafb" : "#fff",
                  transition: "all 0.15s",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 8,
                  }}
                >
                  <span style={{ fontWeight: 500, color: "#111827" }}>
                    {item.label}
                  </span>
                  <span style={{ fontSize: 13, color: "#6b7280" }}>
                    {item.t1}
                  </span>
                </div>
                <ProgressBar value={item.t1} />
                <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 6 }}>
                  Trial 1 score
                </div>
              </button>
            ))}
          </div>

          <div
            style={{
              borderRadius: 16,
              border: "1px solid #e5e7eb",
              background: "#f9fafb",
              padding: 20,
              marginBottom: 20,
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: "#374151",
                marginBottom: 8,
              }}
            >
              Why this feature is based on the paper
            </div>
            <p
              style={{
                fontSize: 13,
                lineHeight: 1.7,
                color: "#6b7280",
                margin: 0,
              }}
            >
              The paper measures engagement with 11 characteristics. This
              prototype simplifies that idea into a smaller set that is easier
              to understand in one screen.
            </p>
          </div>

          <Btn onClick={() => setScreenIndex(1)}>
            Compare trials <ArrowRight size={14} />
          </Btn>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Selected dimension</CardTitle>
          <CardDescription>
            Tap a card on the left to change this panel.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            style={{
              borderRadius: 16,
              background: accentLight,
              padding: 20,
              marginBottom: 16,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                color: "#111827",
                marginBottom: 8,
              }}
            >
              <Lightbulb size={16} color={accent} />
              <span style={{ fontWeight: 600 }}>{current.label}</span>
            </div>
            <div style={{ fontSize: 36, fontWeight: 600, color: "#111827" }}>
              {current.t1}
            </div>
            <div style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>
              Trial 1 value out of 7
            </div>
          </div>

          <div
            style={{
              borderRadius: 16,
              border: "1px solid #e5e7eb",
              padding: 16,
              marginBottom: 16,
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: "#374151",
                marginBottom: 6,
              }}
            >
              Paper content used here
            </div>
            <p
              style={{
                fontSize: 13,
                lineHeight: 1.7,
                color: "#6b7280",
                margin: 0,
              }}
            >
              {current.label === "Creativity"
                ? "The paper notes creativity-related items were lower than the others."
                : current.label === "Interest"
                ? "Interest is one of the 11 engagement characteristics in VisEngage."
                : current.label === "Discovery"
                ? "Example paper item: users learned something new while using the visualization."
                : "Attention is included as one of the dimensions of user engagement."}
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              ["Trial 1", current.t1],
              ["Trial 2", current.t2],
              ["Trial 3", current.t3],
            ].map(([label, val]) => (
              <div key={label as string}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 13,
                    color: "#6b7280",
                    marginBottom: 4,
                  }}
                >
                  <span>{label}</span>
                  <span>{val}</span>
                </div>
                <ProgressBar value={val as number} small />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Feature 1 Compare ────────────────────────────────────────────────────────

function Feature1Compare({ setScreenIndex }: any) {
  return (
    <div style={{ display: "grid", gap: 24, gridTemplateColumns: "1fr 320px" }}>
      <Card>
        <CardHeader>
          <CardTitle size="2xl">Compare trial results</CardTitle>
          <CardDescription>
            This screen uses actual averages from the paper so the viewer can
            compare the three trials.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            style={{
              display: "grid",
              gap: 16,
              gridTemplateColumns: "1fr 1fr 1fr",
            }}
          >
            {trialData.map((trial) => (
              <div
                key={trial.trial}
                style={{
                  borderRadius: 16,
                  border: "1px solid #e5e7eb",
                  padding: 16,
                }}
              >
                <div
                  style={{ fontWeight: 500, color: "#111827", fontSize: 14 }}
                >
                  {trial.trial}
                </div>
                <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>
                  {trial.viz}
                </div>
                <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 16 }}>
                  Engagement score
                </div>
                <div
                  style={{ fontSize: 28, fontWeight: 600, color: "#111827" }}
                >
                  {trial.score}
                </div>
                <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 12 }}>
                  Time in visualization area
                </div>
                <div
                  style={{ fontSize: 22, fontWeight: 600, color: "#111827" }}
                >
                  {trial.time}s
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>What this screen shows</CardTitle>
        </CardHeader>
        <CardContent>
          <p
            style={{
              fontSize: 13,
              lineHeight: 1.7,
              color: "#6b7280",
              marginBottom: 10,
            }}
          >
            Trial 1 has the highest time and highest engagement.
          </p>
          <p
            style={{
              fontSize: 13,
              lineHeight: 1.7,
              color: "#6b7280",
              marginBottom: 10,
            }}
          >
            Trial 2 has lower time, but the engagement score is still close to
            Trial 1.
          </p>
          <p
            style={{
              fontSize: 13,
              lineHeight: 1.7,
              color: "#6b7280",
              marginBottom: 16,
            }}
          >
            Trial 3 is lower on both measures.
          </p>
          <div
            style={{
              borderRadius: 16,
              background: accentLight,
              padding: 16,
              fontSize: 13,
              color: "#374151",
              lineHeight: 1.6,
              marginBottom: 20,
            }}
          >
            Trial 1 and 2 show similar engagement despite different time spent —
            demonstrating that behavioral time alone does not predict engagement
            score.
          </div>
          <Btn onClick={() => setScreenIndex(2)} fullWidth>
            Go to Feature 2 <ArrowRight size={14} />
          </Btn>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Feature 2 Main ───────────────────────────────────────────────────────────

function MiniHeat({ active = false }: { active?: boolean }) {
  return (
    <div
      style={{
        width: "100%",
        height: 32,
        borderRadius: 6,
        border: active ? "none" : "1px solid #e5e7eb",
        background: active ? accent : "#fff",
      }}
    />
  );
}

function Feature2Main({ sliderValue, setSliderValue, setScreenIndex }: any) {
  return (
    <div style={{ display: "grid", gap: 24, gridTemplateColumns: "1fr 360px" }}>
      <Card>
        <CardHeader>
          <div>
            <Badge>Feature 2</Badge>
          </div>
          <div style={{ marginTop: 12 }}>
            <CardTitle size="2xl">Behavior tracking screen</CardTitle>
          </div>
          <CardDescription>
            This feature uses the paper's idea of time spent and cursor
            activity, then adds a simple reflection slider.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            style={{
              borderRadius: 16,
              border: "1px solid #e5e7eb",
              padding: 16,
              marginBottom: 16,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <div>
                <div style={{ fontSize: 12, color: "#9ca3af" }}>
                  Visualization area
                </div>
                <div style={{ fontWeight: 500, color: "#111827" }}>
                  Analysis of Queen · Trial 2
                </div>
              </div>
              <MousePointer2 size={20} color={accent} />
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: 8,
              }}
            >
              {Array.from({ length: 28 }).map((_, i) => (
                <MiniHeat
                  key={i}
                  active={[3, 4, 5, 10, 11, 12, 17, 18, 19].indexOf(i) !== -1}
                />
              ))}
            </div>
            <div style={{ marginTop: 10, fontSize: 13, color: "#6b7280" }}>
              Highlighted boxes show where the cursor spent more time.
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gap: 16,
              gridTemplateColumns: "1fr 1fr",
              marginBottom: 16,
            }}
          >
            <div
              style={{
                borderRadius: 16,
                border: "1px solid #e5e7eb",
                padding: 16,
              }}
            >
              <div style={{ fontSize: 12, color: "#9ca3af" }}>Paper data</div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 600,
                  color: "#111827",
                  marginTop: 4,
                }}
              >
                47.40s
              </div>
              <div style={{ fontSize: 13, color: "#6b7280" }}>
                Average time for Trial 2
              </div>
            </div>
            <div
              style={{
                borderRadius: 16,
                border: "1px solid #e5e7eb",
                padding: 16,
              }}
            >
              <div style={{ fontSize: 12, color: "#9ca3af" }}>
                Reflection score
              </div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 600,
                  color: "#111827",
                  marginTop: 4,
                }}
              >
                {sliderValue}/7
              </div>
              <div style={{ fontSize: 13, color: "#6b7280" }}>
                Simple user feedback after viewing
              </div>
            </div>
          </div>

          <div
            style={{
              borderRadius: 16,
              border: "1px solid #e5e7eb",
              padding: 16,
              marginBottom: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontWeight: 500,
                color: "#111827",
                marginBottom: 12,
              }}
            >
              <SlidersHorizontal size={16} color={accent} />
              How engaged did you feel?
            </div>
            <input
              type="range"
              min="1"
              max="7"
              value={sliderValue}
              onChange={(e) => setSliderValue(Number(e.target.value))}
              style={{ width: "100%" }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 13,
                color: "#9ca3af",
                marginTop: 4,
              }}
            >
              <span>1</span>
              <span>7</span>
            </div>
          </div>

          <Btn onClick={() => setScreenIndex(3)}>
            Compare the two signals <ArrowRight size={14} />
          </Btn>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Why this feature matters</CardTitle>
        </CardHeader>
        <CardContent>
          <p
            style={{
              fontSize: 13,
              lineHeight: 1.7,
              color: "#6b7280",
              marginBottom: 12,
            }}
          >
            The paper collected behavioral data such as time spent and cursor
            movement inside the visualization area.
          </p>
          <p
            style={{
              fontSize: 13,
              lineHeight: 1.7,
              color: "#6b7280",
              marginBottom: 16,
            }}
          >
            This screen turns that into something visible and easy to
            understand.
          </p>
          <div
            style={{
              borderRadius: 16,
              background: accentLight,
              padding: 16,
              fontSize: 13,
              color: "#374151",
              lineHeight: 1.6,
            }}
          >
            The interaction: view behavioral heatmap, rate your own engagement
            with the slider, then compare both signals on the next screen.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Feature 2 Compare ────────────────────────────────────────────────────────

function Feature2Compare({ sliderValue, setScreenIndex }: any) {
  const selfReportPercent = Math.round((sliderValue / 7) * 100);
  return (
    <div style={{ display: "grid", gap: 24, gridTemplateColumns: "1fr 320px" }}>
      <Card>
        <CardHeader>
          <CardTitle size="2xl">Behavior vs self-report</CardTitle>
          <CardDescription>
            Final comparison screen for Feature 2.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            style={{
              display: "grid",
              gap: 16,
              gridTemplateColumns: "1fr 1fr",
              marginBottom: 20,
            }}
          >
            <div
              style={{
                borderRadius: 16,
                border: "1px solid #e5e7eb",
                padding: 20,
              }}
            >
              <div style={{ fontSize: 12, color: "#9ca3af" }}>
                Behavioral activity
              </div>
              <div
                style={{
                  fontSize: 36,
                  fontWeight: 600,
                  color: "#111827",
                  marginTop: 8,
                }}
              >
                78%
              </div>
              <div style={{ marginTop: 12 }}>
                <ProgressBar value={78} max={100} />
              </div>
            </div>
            <div
              style={{
                borderRadius: 16,
                border: "1px solid #e5e7eb",
                padding: 20,
              }}
            >
              <div style={{ fontSize: 12, color: "#9ca3af" }}>
                Self-report activity
              </div>
              <div
                style={{
                  fontSize: 36,
                  fontWeight: 600,
                  color: "#111827",
                  marginTop: 8,
                }}
              >
                {selfReportPercent}%
              </div>
              <div style={{ marginTop: 12 }}>
                <ProgressBar value={selfReportPercent} max={100} />
              </div>
            </div>
          </div>

          <div
            style={{ borderRadius: 16, background: accentLight, padding: 20 }}
          >
            <div style={{ fontWeight: 500, color: "#111827", marginBottom: 8 }}>
              Insight from the paper
            </div>
            <p
              style={{
                fontSize: 13,
                lineHeight: 1.7,
                color: "#374151",
                margin: 0,
              }}
            >
              The paper found a low correlation between engagement score and
              time spent (R² = 0.24). This means visible activity does not
              always equal strong engagement.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>End of prototype</CardTitle>
        </CardHeader>
        <CardContent>
          <p
            style={{
              fontSize: 13,
              lineHeight: 1.7,
              color: "#6b7280",
              marginBottom: 12,
            }}
          >
            Both features are grounded in data and methodology from the
            VisEngage paper (Hung & Parsons, CHI 2017).
          </p>
          <p
            style={{
              fontSize: 13,
              lineHeight: 1.7,
              color: "#6b7280",
              marginBottom: 20,
            }}
          >
            The prototype covers engagement scoring, trial comparison,
            behavioral tracking, and self-report correlation.
          </p>
          <Btn onClick={() => setScreenIndex(0)} fullWidth>
            <ArrowLeft size={14} /> Back to start
          </Btn>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function VisEngageVerticalPrototype() {
  const [screenIndex, setScreenIndex] = useState(0);
  const [selectedMetric, setSelectedMetric] = useState("Interest");
  const [sliderValue, setSliderValue] = useState(5);

  const CurrentScreen = () => {
    switch (screens[screenIndex].id) {
      case "feature1-main":
        return (
          <Feature1Main
            selectedMetric={selectedMetric}
            setSelectedMetric={setSelectedMetric}
            setScreenIndex={setScreenIndex}
          />
        );
      case "feature1-compare":
        return <Feature1Compare setScreenIndex={setScreenIndex} />;
      case "feature2-main":
        return (
          <Feature2Main
            sliderValue={sliderValue}
            setSliderValue={setSliderValue}
            setScreenIndex={setScreenIndex}
          />
        );
      case "feature2-compare":
        return (
          <Feature2Compare
            sliderValue={sliderValue}
            setScreenIndex={setScreenIndex}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fff",
        color: "#111827",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ borderBottom: "1px solid #e5e7eb", background: "#fff" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "20px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: accent,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <BarChart3 size={20} color="#fff" />
            </div>
            <div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: accent,
                }}
              >
                VisEngage Prototype
              </div>
              <div style={{ fontSize: 13, color: "#9ca3af" }}>
                Interactive research prototype
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <Btn
              outline
              onClick={() => setScreenIndex(Math.max(0, screenIndex - 1))}
            >
              <ArrowLeft size={14} /> Prev
            </Btn>
            <Btn
              onClick={() =>
                setScreenIndex(Math.min(screens.length - 1, screenIndex + 1))
              }
            >
              Next <ArrowRight size={14} />
            </Btn>
          </div>
        </div>
      </div>

      {/* Main */}
      <main
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div
            style={{
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#9ca3af",
            }}
          >
            Current frame
          </div>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: "#111827",
              margin: 0,
            }}
          >
            {screens[screenIndex].title}
          </h1>
          <ScreenNav
            screenIndex={screenIndex}
            setScreenIndex={setScreenIndex}
          />
        </div>
        <CurrentScreen />
      </main>
    </div>
  );
}
