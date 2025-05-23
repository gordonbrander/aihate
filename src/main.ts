import { parser, eng } from "@gordonb/spandrel";

const grammar = {
  start: [
    "looks like #poo#",
    "wow, looks like #garbage#",
    "this sucks thanks",
    "this is #garbage# thanks",
    "this sucks #poo#",
    "wow this sucks #poo#",
    "wow this sucks #poo# thanks",
    "hey thanks this is absolute #poo#",
    "Nice! This sucks",
    "Nice! This sucks #poo#",
    "nice this is absolute #poo#",
    "nice this is absolute loser #poo#",
    "thanks I hate it",
    "how many trees were killed for this",
    "how many gallons of water were wasted for this",
    "This sucks #poo#. Absolute #garbage#",
    "This sucks #poo# and #is_a_disaster#",
    "thanks AI is absolute #garbage#",
    "This is a #cancer# on humanity",
    "What is the point of this?",
    "thanks #kys#",
    "Fuck this loser AI #garbage#",
    "Fuck this AI #garbage#",
    "fuck this AI #garbage#. #kys#",
    "wow thank you for the absolute lowest of the low #garbage#",
    "wow thank you for this absolute loser #garbage#",
    "nobody wants this",
    "thanks nobody wants this",
    "thanks nobody wants this #garbage#",
    "nobody wants this #garbage# thanks",
    "thanks nobody wants this AI #garbage#",
    "thanks nobody wants this. #kys#",
    "I think it's cool that AI doesn't work and #is_a_disaster#",
    "I think it's cool that AI doesn't work and is #garbage#",
    "AI is ruining everything",
  ],
  garbage: [
    "shit",
    "dogshit",
    "dogshit",
    "dogshit",
    "dogshit",
    "garbage",
    "garbage",
    "trash",
    "slop",
    "slop",
  ],
  poo: [
    "shit",
    "ass",
    "crap",
    "dogshit",
    "dogshit",
    "dogshit",
    "dogshit",
    "garbage",
  ],
  cancer: ["cancer", "cancer", "plague"],
  is_a_disaster: [
    "is an ecological disaster",
    "is a #cancer# on humanity",
    "wastes energy and water",
    "killed a whole forest",
    "uses a million gallons of water",
  ],
  kys: ["kys", "log off", "delete your account", "delete this"],
};

const flatten = parser({ modifiers: eng.modifiers });

const $ = (
  selector: string,
  root: Element | Document | ShadowRoot = document,
): HTMLElement | null =>
  (root.querySelector(`:scope ${selector}`) as HTMLElement) ?? null;

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const getRandomInRange = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

async function* AiTextGenerationSimulator(text: string) {
  const words = text.split(" ");
  for (const word of words) {
    const ms = getRandomInRange(100, 800);
    await sleep(ms);
    yield word;
  }
}
const main = () => {
  let generating = false;
  const appEl = $("#app")!;
  const genEl = $("#generate", appEl)!;
  const hateEl = $("#hate", appEl)!;
  const timeEl = $("#time", appEl)!;
  const copyEl = $("#copy", appEl)!;

  const generate = async () => {
    if (generating) return;
    generating = true;

    genEl.textContent = "Thinking...";

    const hate = flatten(grammar);
    timeEl.textContent = new Date().toLocaleString();

    hateEl.innerHTML = "";

    await sleep(500);

    for await (const word of AiTextGenerationSimulator(hate)) {
      const token = document.createElement("span");
      token.classList.add("token");
      token.textContent = word;
      hateEl?.append(" ");
      hateEl!.append(token);
    }

    genEl.textContent = "Generate another AI take";
    generating = false;
  };

  genEl.onclick = generate;

  const copy = async () => {
    await navigator.clipboard.writeText(hateEl.textContent ?? "");
    copyEl.textContent = "Copied!";
    setTimeout(() => {
      copyEl!.textContent = "Copy";
    }, 1000);
  };

  copyEl.onclick = copy;

  generate();
};

main();
