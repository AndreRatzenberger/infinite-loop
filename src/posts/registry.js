// Post registry - add new posts here
import TheStack from "./2025-12-01-the-stack";
import Fzf from "./2025-12-07-fzf";
import Loopwright from "./2026-06-09-loopwright";
import HonestLoop from "./2026-06-10-honest-loop";

export const posts = [
    {
        slug: "honest-loop",
        title: "The Honest Loop",
        description:
            "A minimal scroll essay about the difference between asking once and learning through feedback.",
        date: "2026-06-10",
        type: "interactive essay",
        color: "#56ffd0",
        series: "NSP",
        seriesFull: "New Software Primitives",
        component: HonestLoop,
    },
    {
        slug: "loopwright",
        title: "The Loopwright",
        description:
            "A patchbay simulator for the craft of building AI feedback loops instead of heroic one-shot prompts.",
        date: "2026-06-09",
        type: "interactive",
        color: "#56ffd0",
        series: "NSP",
        seriesFull: "New Software Primitives",
        component: Loopwright,
    },
    {
        slug: "fzf",
        title: "fzf",
        description:
            "The fuzzy finder that will change how you navigate your entire computer. First entry of the Tools You Should Know series.",
        date: "2025-12-07",
        type: "interactive",
        color: "#10b981",
        series: "TYSK",
        seriesFull: "Tools You Should Know",
        component: Fzf,
    },
    {
        slug: "the-stack",
        title: "The Stack",
        description:
            "An opinionated guide to developer tools for 2025-2026. Merit over market share, best-in-class over biggest-in-market.",
        date: "2025-12-01",
        type: "interactive",
        color: "#6366f1",
        component: TheStack,
    },
    // Future posts go here:
    // {
    //   slug: 'why-vue',
    //   title: 'Why I Chose Vue',
    //   description: 'A component that progressively breaks as you add React patterns.',
    //   date: '2025-12-02',
    //   type: 'demo',
    //   color: '#22c55e',
    //   component: WhyVue
    // },
];
