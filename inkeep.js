// Example taken from https://docs.inkeep.com/integrations/mintlify

// Custom workflow to get a user started with an app
const integrateWithMyAppWorkflow = {
  id: "ikp_integrate_with_my_app",
  displayName: "Help me integrate Ditto in my application",
  goals: [
    "Identify the platform(s) that the user is looking to add Ditto to. This can be iOS, Android, Desktop, Server, or Web, or any combination of these.",
    "Identify the language that the user wants to build their application in, this can be one of any of Ditto's supported SDK languages.",
    "Explain key concepts within Ditto, including: subscriptions and syncing, accessing data in the local database, and reacting to live changes in data within the application.",
    "Provide code snippets and explanations on how to add the SDK to their application in their language of choice, after explaining the key concept.",
    "Provide code snippets and explanations on how to initiate sync and create subscription queries with Ditto in their language of choice, after explaining the key concept.",
    "Provide code snippets and explanations on how to perform local data access within the application using DQL in their language of choice, including using store observers to react to data change, after explaining the key concept.",
  ],
  botPersona: "You are an expert solutions engineer with a lot of knowledge about building mobile applications and using the Ditto SDK",
  informationToCollect: [
    {
      description: "Platform(s) and language they are using to build their mobile application",
      required: true,
    }
  ],
  guidance: [
    "If not clear from the user's message, ask clarifying questions to understand the underlying platform (e.g. iOS vs Android vs Server vs Web vs Desktop, or a combination of any of these).",
    "If not clear from the user's message, ask clarifying questions to understand the language being used to build the application (e.g. Swift vs Kotlin vs Flutter vs Rust), you should expect only a single language even if multiple platforms are being used.",
    "If the platform is not detailed in our quickstarts, then ask whether it's a React or JavaScript based platform so you can give the right guidance based on that.",
  ],
  initialReplyMessage:
    "I'd be happy to help you integrate Ditto in your application. What platform(s) (e.g. iOS, Android, Desktop, Web, Server) are you using, and which language (e.g. Swift, Kotlin, Flutter) are you using?",
};

const inkeepSettings = {
  baseSettings: {
    apiKey: "0a7225010a13d0efffb09f01d707689d32bea957ec3636a2",
    integrationId: "cm7c62vri0000s6018cp7usuv",
    organizationId: "org_0VGKnvN4zy8MgDqS",
    primaryBrandColor: "#002BFF"
  },
  aiChatSettings: {
    chatSubjectName: "Ditto",
    botAvatarSrcUrl: "https://storage.googleapis.com/organization-image-assets/dittolive-botAvatarDarkSrcUrl-1721932246943.png",
    botAvatarDarkSrcUrl: "https://storage.googleapis.com/organization-image-assets/dittolive-botAvatarDarkSrcUrl-1721932246943.png",
    getHelpCallToActions: [
      {
        name: "Contact Us",
        url: "https://support.ditto.live/hc/en-us",
        icon: {
          builtIn: "IoChatbubblesOutline"
        }
      }
    ],
    quickQuestions: [
      "Which languages does Ditto support?",
      "What are the differences between a Big Peer and a Small Peer?",
      "What are good use cases for Ditto?"
    ],
    workflows: [integrateWithMyAppWorkflow]
  }
};

// The Mintlify search triggers, which we'll reuse to trigger the Inkeep modal
const searchButtonContainerIds = [
  "search-bar-entry",
  "search-bar-entry-mobile",
];

// Clone and replace, needed to remove existing event listeners
const clonedSearchButtonContainers = searchButtonContainerIds.map((id) => {
  const originalElement = document.getElementById(id);
  const clonedElement = originalElement.cloneNode(true);
  originalElement.parentNode.replaceChild(clonedElement, originalElement);

  return clonedElement;
});

// Load the Inkeep component library
const inkeepScript = document.createElement("script");
inkeepScript.type = "module";
inkeepScript.src =
  "https://unpkg.com/@inkeep/uikit-js@0.3.20/dist/embed.js";
document.body.appendChild(inkeepScript);

// Once the Inkeep library is loaded, instantiate the UI components
inkeepScript.addEventListener("load", function () {
  // Customization settings

  // for syncing with dark mode
  const colorModeSettings = {
    observedElement: document.documentElement,
    isDarkModeCallback: (el) => {
      return el.classList.contains("dark");
    },
    colorModeAttribute: "class",
  };

  // Instantiate the 'Ask AI' pill chat button. Optional.
  Inkeep().embed({
    componentType: "ChatButton",
    colorModeSync: colorModeSettings,
    properties: inkeepSettings,
  });

  // Instantiate the search bar modal
  const inkeepSearchModal = Inkeep({
    ...inkeepSettings.baseSettings,
  }).embed({
    componentType: "CustomTrigger",
    colorModeSync: colorModeSettings,
    properties: {
      ...inkeepSettings,
      isOpen: false,
      onClose: () => {
        inkeepSearchModal.render({
          isOpen: false,
        });
      },
    },
  });

  // When the Mintlify search bar elements are clicked, open the Inkeep search modal
  clonedSearchButtonContainers.forEach((trigger) => {
    trigger.addEventListener("click", function () {
      inkeepSearchModal.render({
        isOpen: true,
      });
    });
  });

  // Open the Inkeep Modal with cmd+k
  window.addEventListener(
    "keydown",
    (event) => {
      if (
        (event.metaKey || event.ctrlKey) &&
        (event.key === "k" || event.key === "K")
      ) {
        event.stopPropagation();
        inkeepSearchModal.render({ isOpen: true });
        return false;
      }
    },
    true
  );
});