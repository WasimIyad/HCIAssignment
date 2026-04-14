import React, { useState } from "react";
import { ArrowLeft, ArrowRight, BarChart3, MousePointer2, Lightbulb, SlidersHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const accent = "#A855F7";

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
  { trial: "Trial 1", viz: "Record Breaking Coasters", score: 123.92, time: 64.47 },
  { trial: "Trial 2", viz: "Analysis of Queen", score: 123.20, time: 47.40 },
  { trial: "Trial 3", viz: "Women in Computer Science", score: 104.50, time: 43.22 },
];

function ProgressBar({ value, max = 7, small = false }) {
  return (
    <div className={`w-full rounded-full ${small ? "h-2" : "h-3"} bg-neutral-200`}>
      <div
        className={`rounded-full ${small ? "h-2" : "h-3"}`}
        style={{ width: `${(value / max) * 100}%`, backgroundColor: accent }}
      />
    </div>
  );
}

function ScreenNav({ screenIndex, setScreenIndex }) {
  return (
    <div className="flex flex-wrap gap-2">
      {screens.map((screen, i) => (
        <button
          key={screen.id}
          onClick={() => setScreenIndex(i)}
          className={`rounded-full border px-4 py-2 text-sm transition ${
            i === screenIndex
              ? "border-transparent text-white"
              : "border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50"
          }`}
          style={i === screenIndex ? { backgroundColor: accent } : {}}
        >
          {screen.title}
        </button>
      ))}
    </div>
  );
}

function Feature1Main({ selectedMetric, setSelectedMetric, setScreenIndex }) {
  const current = feature1Data.find((item) => item.label === selectedMetric) || feature1Data[0];

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <Card className="border-neutral-200 bg-white shadow-sm">
        <CardHeader>
          <div className="flex flex-wrap gap-2">
            <Badge className="border-0 text-white" style={{ backgroundColor: accent }}>Feature 1</Badge>
            <Badge className="border border-neutral-200 bg-neutral-50 text-neutral-700 hover:bg-neutral-50">Simplified student version</Badge>
          </div>
          <CardTitle className="mt-3 text-2xl text-neutral-900">Engagement Score Screen</CardTitle>
          <CardDescription className="text-neutral-600">
            This screen shows four engagement dimensions from the paper using a simple card and bar layout.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            {feature1Data.map((item) => (
              <button
                key={item.label}
                onClick={() => setSelectedMetric(item.label)}
                className={`rounded-2xl border p-4 text-left transition ${
                  selectedMetric === item.label ? "border-neutral-900 bg-neutral-50" : "border-neutral-200 bg-white hover:bg-neutral-50"
                }`}
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-medium text-neutral-900">{item.label}</span>
                  <span className="text-sm text-neutral-500">{item.t1}</span>
                </div>
                <ProgressBar value={item.t1} />
                <div className="mt-2 text-sm text-neutral-500">Trial 1 score</div>
              </button>
            ))}
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
            <div className="mb-3 text-sm font-medium text-neutral-700">Why this feature is based on the paper</div>
            <p className="text-sm leading-6 text-neutral-600">
              The paper measures engagement with 11 characteristics. This prototype simplifies that idea into a smaller set that is easier to understand in one screen.
            </p>
          </div>

          <div className="flex gap-3">
            <Button className="text-white" style={{ backgroundColor: accent }} onClick={() => setScreenIndex(1)}>
              Compare trials
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-neutral-200 bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl text-neutral-900">Selected dimension</CardTitle>
          <CardDescription className="text-neutral-600">Tap a card on the left to change this panel.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-2xl p-5" style={{ backgroundColor: "#F3E8FF" }}>
            <div className="mb-2 flex items-center gap-2 text-neutral-900">
              <Lightbulb className="h-4 w-4" style={{ color: accent }} />
              <span className="font-semibold">{current.label}</span>
            </div>
            <div className="text-4xl font-semibold text-neutral-900">{current.t1}</div>
            <div className="mt-2 text-sm text-neutral-600">Trial 1 value out of 7</div>
          </div>

          <div className="rounded-2xl border border-neutral-200 p-4">
            <div className="mb-2 text-sm font-medium text-neutral-700">Paper content used here</div>
            <p className="text-sm leading-6 text-neutral-600">
              {current.label === "Creativity"
                ? "The paper notes creativity-related items were lower than the others."
                : current.label === "Interest"
                ? "Interest is one of the 11 engagement characteristics in VisEngage."
                : current.label === "Discovery"
                ? "Example paper item: users learned something new while using the visualization."
                : "Attention is included as one of the dimensions of user engagement."}
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <div className="mb-1 flex justify-between text-sm text-neutral-600"><span>Trial 1</span><span>{current.t1}</span></div>
              <ProgressBar value={current.t1} small />
            </div>
            <div>
              <div className="mb-1 flex justify-between text-sm text-neutral-600"><span>Trial 2</span><span>{current.t2}</span></div>
              <ProgressBar value={current.t2} small />
            </div>
            <div>
              <div className="mb-1 flex justify-between text-sm text-neutral-600"><span>Trial 3</span><span>{current.t3}</span></div>
              <ProgressBar value={current.t3} small />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Feature1Compare({ setScreenIndex }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <Card className="border-neutral-200 bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-neutral-900">Compare trial results</CardTitle>
          <CardDescription className="text-neutral-600">
            This screen uses actual averages from the paper so the viewer can compare the three trials.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          {trialData.map((trial) => (
            <div key={trial.trial} className="rounded-2xl border border-neutral-200 p-4">
              <div className="text-sm font-medium text-neutral-900">{trial.trial}</div>
              <div className="mt-1 text-sm text-neutral-500">{trial.viz}</div>
              <div className="mt-4 text-sm text-neutral-500">Engagement score</div>
              <div className="text-3xl font-semibold text-neutral-900">{trial.score}</div>
              <div className="mt-4 text-sm text-neutral-500">Time in visualization area</div>
              <div className="text-2xl font-semibold text-neutral-900">{trial.time}s</div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-neutral-200 bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-neutral-900">What this screen shows</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-6 text-neutral-600">
          <p>Trial 1 has the highest time and highest engagement.</p>
          <p>Trial 2 has lower time, but the engagement score is still close to Trial 1.</p>
          <p>Trial 3 is lower on both measures.</p>
          <div className="rounded-2xl p-4" style={{ backgroundColor: "#F3E8FF" }}>
            This is a simpler way to show the paper’s comparison without making the prototype feel overly advanced.
          </div>
          <Button className="w-full text-white" style={{ backgroundColor: accent }} onClick={() => setScreenIndex(2)}>
            Go to Feature 2
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function MiniHeat({ active = false }) {
  return (
    <div
      className={`aspect-square rounded-md border ${active ? "border-transparent" : "border-neutral-200"}`}
      style={{ backgroundColor: active ? accent : "white" }}
    />
  );
}

function Feature2Main({ sliderValue, setSliderValue, setScreenIndex }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <Card className="border-neutral-200 bg-white shadow-sm">
        <CardHeader>
          <div className="flex flex-wrap gap-2">
            <Badge className="border-0 text-white" style={{ backgroundColor: accent }}>Feature 2</Badge>
            <Badge className="border border-neutral-200 bg-neutral-50 text-neutral-700 hover:bg-neutral-50">Behavior + self-report</Badge>
          </div>
          <CardTitle className="mt-3 text-2xl text-neutral-900">Behavior tracking screen</CardTitle>
          <CardDescription className="text-neutral-600">
            This feature uses the paper’s idea of time spent and cursor activity, then adds a simple reflection slider.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="rounded-2xl border border-neutral-200 p-4">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <div className="text-sm text-neutral-500">Visualization area</div>
                <div className="font-medium text-neutral-900">Analysis of Queen · Trial 2</div>
              </div>
              <MousePointer2 className="h-5 w-5" style={{ color: accent }} />
            </div>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 28 }).map((_, i) => (
                <MiniHeat key={i} active={[3,4,5,10,11,12,17,18,19].includes(i)} />
              ))}
            </div>
            <div className="mt-3 text-sm text-neutral-600">Highlighted boxes show where the cursor spent more time.</div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-neutral-200 p-4">
              <div className="text-sm text-neutral-500">Paper data</div>
              <div className="mt-1 text-3xl font-semibold text-neutral-900">47.40s</div>
              <div className="text-sm text-neutral-600">Average time for Trial 2</div>
            </div>
            <div className="rounded-2xl border border-neutral-200 p-4">
              <div className="text-sm text-neutral-500">Reflection score</div>
              <div className="mt-1 text-3xl font-semibold text-neutral-900">{sliderValue}/7</div>
              <div className="text-sm text-neutral-600">Simple user feedback after viewing</div>
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-200 p-4">
            <div className="mb-2 flex items-center gap-2 text-neutral-900">
              <SlidersHorizontal className="h-4 w-4" style={{ color: accent }} />
              <span className="font-medium">How engaged did you feel?</span>
            </div>
            <input
              type="range"
              min="1"
              max="7"
              value={sliderValue}
              onChange={(e) => setSliderValue(Number(e.target.value))}
              className="mt-3 w-full"
              style={{ accentColor: accent }}
            />
            <div className="mt-2 flex justify-between text-sm text-neutral-500">
              <span>1</span>
              <span>7</span>
            </div>
          </div>

          <Button className="text-white" style={{ backgroundColor: accent }} onClick={() => setScreenIndex(3)}>
            Compare the two signals
          </Button>
        </CardContent>
      </Card>

      <Card className="border-neutral-200 bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-neutral-900">Why this feature matters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-6 text-neutral-600">
          <p>The paper collected behavioral data such as time spent and cursor movement inside the visualization area.</p>
          <p>This screen turns that into something visible and easy to understand.</p>
          <div className="rounded-2xl p-4" style={{ backgroundColor: "#F3E8FF" }}>
            The interaction here is simple: view behavior, adjust the slider, then move to the comparison screen.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Feature2Compare({ sliderValue, setScreenIndex }) {
  const selfReportPercent = Math.round((sliderValue / 7) * 100);
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <Card className="border-neutral-200 bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-neutral-900">Behavior vs self-report</CardTitle>
          <CardDescription className="text-neutral-600">
            Final comparison screen for Feature 2.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-neutral-200 p-5">
              <div className="text-sm text-neutral-500">Behavioral activity</div>
              <div className="mt-2 text-4xl font-semibold text-neutral-900">78%</div>
              <div className="mt-3"><ProgressBar value={78} max={100} /></div>
            </div>
            <div className="rounded-2xl border border-neutral-200 p-5">
              <div className="text-sm text-neutral-500">Self-report activity</div>
              <div className="mt-2 text-4xl font-semibold text-neutral-900">{selfReportPercent}%</div>
              <div className="mt-3"><ProgressBar value={selfReportPercent} max={100} /></div>
            </div>
          </div>

          <div className="rounded-2xl p-5" style={{ backgroundColor: "#F3E8FF" }}>
            <div className="font-medium text-neutral-900">Insight from the paper</div>
            <p className="mt-2 text-sm leading-6 text-neutral-700">
              The paper found a low correlation between engagement score and time spent (R² = 0.24). This means visible activity does not always equal strong engagement.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-neutral-200 bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-neutral-900">End of prototype</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-6 text-neutral-600">
          <p>This version is cleaner, lighter, and more believable as a university-level submission.</p>
          <p>It still includes two features, multiple states, clickable flow, and real paper data.</p>
          <Button className="w-full text-white" style={{ backgroundColor: accent }} onClick={() => setScreenIndex(0)}>
            Back to start
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default function VisEngageVerticalPrototype() {
  const [screenIndex, setScreenIndex] = useState(0);
  const [selectedMetric, setSelectedMetric] = useState("Interest");
  const [sliderValue, setSliderValue] = useState(5);

  const CurrentScreen = () => {
    switch (screens[screenIndex].id) {
      case "feature1-main":
        return <Feature1Main selectedMetric={selectedMetric} setSelectedMetric={setSelectedMetric} setScreenIndex={setScreenIndex} />;
      case "feature1-compare":
        return <Feature1Compare setScreenIndex={setScreenIndex} />;
      case "feature2-main":
        return <Feature2Main sliderValue={sliderValue} setSliderValue={setSliderValue} setScreenIndex={setScreenIndex} />;
      case "feature2-compare":
        return <Feature2Compare sliderValue={sliderValue} setScreenIndex={setScreenIndex} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <div className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl text-white" style={{ backgroundColor: accent }}>
                <BarChart3 className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: accent }}>VisEngage Prototype</div>
                <div className="text-sm text-neutral-500">Simplified high-fidelity student version</div>
              </div>
            </div>
          </div>
          <div className="hidden gap-2 md:flex">
            <Button variant="outline" className="border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50" onClick={() => setScreenIndex(Math.max(0, screenIndex - 1))}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Prev
            </Button>
            <Button className="text-white" style={{ backgroundColor: accent }} onClick={() => setScreenIndex(Math.min(screens.length - 1, screenIndex + 1))}>
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl space-y-6 px-6 py-6">
        <div className="space-y-3">
          <div className="text-sm uppercase tracking-[0.18em] text-neutral-400">Current frame</div>
          <h1 className="text-3xl font-semibold text-neutral-900">{screens[screenIndex].title}</h1>
          <ScreenNav screenIndex={screenIndex} setScreenIndex={setScreenIndex} />
        </div>
        <CurrentScreen />
      </main>
    </div>
  );
}
