import { EmptyStateConfig } from '@/components/common/EmptyState/EmptyState.types'
import { MockPlaylist, HowItWorksStep } from '@/components/common/Home/Home.types'
import { NotFoundAction } from '@/app/not-found'
import { Film, BookOpen, Home, LayoutGrid } from 'lucide-react'
import { Metadata } from 'next'

export const AUTH_GUARD_CONSTANTS = {
  STORAGE_KEY: 'return_to',
  HOME_PATH: '/',
  REDIRECT_MESSAGE: 'Redirecting to Spotify...',
} as const

export const HEADER_CONSTANTS = {
  APP_NAME: 'Spotify Recs',
  HOME_PATH: '/',
  ARIA_LABELS: {
    TOGGLE_THEME: 'Toggle theme',
  },
} as const

export const DASHBOARD_CONSTANTS = {
  ROUTES: {
    READING_LIST: '/reading-list',
    WATCH_LIST: '/watch-list',
  },

  TEXTS: {
    LOADING: {
      TITLE: 'Preparing your vibes…',
      DESCRIPTION: 'Fetching playlists and getting recommendations ready.',
    },
    ERROR: {
      TITLE: 'No playlists found',
      DESCRIPTION:
        "Try reconnecting your Spotify account or creating a few playlists — they're the base for your recommendations.",
      BUTTON: 'Reconnect Spotify',
    },
    HEADER: {
      TITLE: 'Your Spotify Playlists',
      DESCRIPTION: 'Select playlists to influence your recommendations.',
      READING_LIST: 'Reading list',
      WATCH_LIST: 'Watch list',
    },
    ACTIONS: {
      GENERATING: 'Processing...',
      GENERATE: 'Generate',
      NO_SELECTION: 'Pick at least one playlist.',
      SELECTED: 'Selected:',
      PLAYLISTS: 'playlists',
      JUMP_TO_RESULTS: 'Jump to results',
    },
    RECOMMENDATIONS: {
      BOOKS: 'Books Recommendations',
      MOVIES: 'Movies Recommendations',
      EMPTY_PREFIX: 'No recommendations yet. Select playlists above and click',
      EMPTY_SUFFIX: '.',
    },
  },

  TOAST_MESSAGES: {
    SAVED_BOOK: 'Saved to reading list',
    SAVED_MOVIE: 'Saved to watch list',
    RECONNECT_ERROR: 'Failed to reconnect. Please try again.',
  },

  SKELETON_COUNT: 6,
} as const

export const READING_LIST_CONSTANTS = {
  ROUTES: {
    DASHBOARD: '/dashboard',
  },

  TEXTS: {
    LOADING: 'Loading your reading list…',
    ERROR: 'Failed to load reading list.',

    HEADER: {
      TITLE: 'Your reading list',
      DESCRIPTION: "All the books you've saved from your Spotify-inspired recommendations.",
      BACK_BUTTON: 'Back to dashboard',
      CLEAR_ALL: 'Clear all',
    },

    CONFIRM_DIALOG: {
      CLEAR_ALL: {
        TITLE: 'Clear all saved books?',
        MESSAGE:
          "This action will remove every book from your reading list. You won't be able to undo this.",
      },
      REMOVE_BOOK: {
        TITLE: 'Remove book?',
        MESSAGE_PREFIX: 'Remove "',
        MESSAGE_SUFFIX: '" from your list?',
      },
    },

    TOOLBAR: {
      SEARCH_PLACEHOLDER: 'Search by title',
      SORT_ASC: 'Sort: A-Z',
      SORT_DESC: 'Sort: Z-A',
      FILTER_UNREAD: 'Unread only',
      FILTER_ALL: 'All books',
    },

    EMPTY_FILTERED: {
      MESSAGE: 'No books match your filters.',
      CLEAR_BUTTON: 'Clear filters',
    },

    BOOK_CARD: {
      MARK_READ: 'Mark as read',
      MARK_UNREAD: 'Mark as unread',
      READ_LABEL: 'Read',
      MARK_READ_LABEL: 'Mark read',
      NO_COVER: 'No cover',
      VIEW_DETAILS: 'View Details',
    },
  },

  ANIMATION: {
    INITIAL: { opacity: 0, scale: 0.9 },
    ANIMATE: { opacity: 1, scale: 1 },
    EXIT: { opacity: 0, scale: 0.9 },
  },
} as const

export const WATCH_LIST_CONSTANTS = {
  ROUTES: {
    DASHBOARD: '/dashboard',
  },

  TEXTS: {
    LOADING: 'Loading your watch list…',
    ERROR: 'Failed to load watch list.',

    HEADER: {
      TITLE: 'Your watch list',
      DESCRIPTION: 'Movies you have saved based on your Spotify vibe.',
      BACK_BUTTON: 'Back to dashboard',
      CLEAR_ALL: 'Clear all',
    },

    CONFIRM_DIALOG: {
      CLEAR_ALL: {
        TITLE: 'Clear all saved movies?',
        MESSAGE:
          "This action will remove every movie from your watch list. You won't be able to undo this.",
      },
      REMOVE_MOVIE: {
        TITLE: 'Remove movie?',
        MESSAGE_PREFIX: 'Remove "',
        MESSAGE_SUFFIX: '" from your list?',
      },
    },

    TOOLBAR: {
      SEARCH_PLACEHOLDER: 'Search movies by title...',
      SORT_ASC: 'Sort: A-Z',
      SORT_DESC: 'Sort: Z-A',
      FILTER_UNWATCHED: 'Unwatched',
      FILTER_ALL: 'All movies',
    },

    EMPTY_FILTERED: {
      MESSAGE: 'No movies match your filters.',
      CLEAR_BUTTON: 'Clear filters',
    },

    MOVIE_CARD: {
      MARK_WATCHED: 'Mark as watched',
      MARK_UNWATCHED: 'Mark as unwatched',
      WATCHED_LABEL: 'Watched',
      MARK_WATCHED_LABEL: 'Mark watched',
      NO_POSTER: 'No poster',
      VIEW_DETAILS: 'View details',
    },
  },

  ANIMATION: {
    INITIAL: { opacity: 0, scale: 0.9 },
    ANIMATE: { opacity: 1, scale: 1 },
    EXIT: { opacity: 0, scale: 0.9 },
  },
} as const

export const EMPTY_STATE_CONSTANTS = {
  ROUTES: {
    DASHBOARD: '/dashboard',
  },

  ICON_STROKE_WIDTH: 1.5,

  VARIANTS: {
    MOVIES: {
      icon: Film,
      title: 'Your watch list is empty',
      description:
        'Generate movie recommendations from your playlists and save them here for your next movie night.',
      buttonText: 'Discover movies',
      hint: 'Switch to Movies in the dashboard to get started.',
      dashboardRoute: '/dashboard',
    } satisfies EmptyStateConfig,

    BOOKS: {
      icon: BookOpen,
      title: 'Your reading list is empty',
      description:
        'Generate book recommendations from your playlists and save them here for your next reading session.',
      buttonText: 'Discover books',
      hint: 'Switch to Books in the dashboard to get started.',
      dashboardRoute: '/dashboard',
    } satisfies EmptyStateConfig,
  },
} as const

export const CALLBACK_CONSTANTS = {
  ROUTES: {
    HOME: '/',
    DASHBOARD: '/dashboard',
  },

  STORAGE_KEYS: {
    CODE_VERIFIER: 'code_verifier',
    RETURN_TO: 'return_to',
  },

  QUERY_PARAMS: {
    CODE: 'code',
    ERROR: 'error',
  },

  TEXTS: {
    LOADING: {
      TITLE: 'Finalizing Login...',
      DESCRIPTION: 'Connecting your Spotify account to our servers.',
    },
  },

  TOAST_MESSAGES: {
    SUCCESS: 'Login successful!',
    ERRORS: {
      AUTHORIZATION_FAILED: 'Authorization failed',
      MISSING_VERIFIER: 'Missing code verifier',
      BACKEND_NO_TOKEN: 'Backend did not return a token',
      LOGIN_FAILED: 'Login Failed',
      NETWORK_ERROR: 'Could not connect to server. Is the Java Backend running?',
      UNKNOWN_ERROR: 'Unknown error',
    },
  },

  TOAST_DURATION: {
    ERROR: 5000,
  },
} as const

export const HOME_CONSTANTS = {
  ROUTES: {
    DASHBOARD: '/dashboard',
  },

  MOCK_PLAYLISTS: [
    {
      name: 'Moody nights',
      image: 'https://picsum.photos/300?random=1',
      tracksTotal: 42,
    },
    {
      name: 'Focus time',
      image: 'https://picsum.photos/300?random=2',
      tracksTotal: 18,
    },
    {
      name: 'Weekend Escapes',
      image: 'https://picsum.photos/300?random=3',
      tracksTotal: 27,
    },
  ] satisfies MockPlaylist[],

  TEXTS: {
    HERO: {
      BADGE: 'Book and movie recommendations from your Spotify taste',
      TITLE: {
        LINE_1: 'Turn your Spotify playlists',
        LINE_2: 'into smarter ',
        HIGHLIGHT: 'book or movie picks',
      },
      DESCRIPTION:
        'Choose one or more of your playlists as signals, map mood and energy to genres and themes, and get a curated reading or watch list that matches your vibe.',
      BUTTONS: {
        PRIMARY: 'Connect with Spotify',
        SECONDARY: 'Try a quick demo',
      },
      FEATURES: [
        '• Secure connection with Spotify',
        '• Your listening data stays private',
        '• Save reading and watch lists to your account',
      ],
      PREVIEW: {
        BUTTON: 'Generate recommendations',
        INFO: 'Select one or multiple playlists.',
      },
    },

    FEATURES: [
      {
        title: 'Seed with your playlists',
        desc: 'Pick 1–3 of your playlists to reflect mood, energy, and taste.',
      },
      {
        title: 'Smart mapping',
        desc: 'We translate audio features into book or movie genres, pacing, themes, and tone.',
      },
      {
        title: 'One-click save',
        desc: 'Review, tweak, and save as a personal reading or watch list.',
      },
    ],

    HOW_IT_WORKS: {
      TITLE: 'How it works',
      STEPS: [
        {
          title: 'Connect',
          description: 'Sign in with Spotify (secure PKCE).',
        },
        {
          title: 'Select seeds',
          description: 'Choose playlists that best represent your vibe.',
        },
        {
          title: 'Generate & save',
          description: 'Get book or movie picks, adjust genres/themes, save your list.',
        },
      ] satisfies HowItWorksStep[],
    },

    CTA: {
      TITLE: 'Ready to find your next read or watch?',
      DESCRIPTION: 'Start from your playlists and let the book and movie recommendations flow.',
      BUTTON: 'Open dashboard',
    },
  },

  TOAST_MESSAGES: {
    LOGIN_ERROR: {
      TITLE: 'Failed to connect',
      DESCRIPTION: 'Could not initiate Spotify login. Please try again.',
    },
    DEMO_MODE: {
      TITLE: 'Demo mode',
      DESCRIPTION:
        "This is a preview. After connecting Spotify, we'll generate real book or movie recommendations.",
    },
  },
} as const

export const NOT_FOUND_CONSTANTS = {
  ICON_STROKE_WIDTH: 1.8,

  TEXTS: {
    TITLE: "Oops — nothing's playing here",
    DESCRIPTION: {
      LINE_1: "Looks like the page you're looking for doesn't exist.",
      LINE_2: "Let's get you back to your playlists.",
    },
  },

  ACTIONS: [
    {
      href: '/',
      label: 'Back to Home',
      icon: Home,
      variant: 'default',
    },
    {
      href: '/dashboard',
      label: 'Open Dashboard',
      icon: LayoutGrid,
      variant: 'outline',
    },
  ] satisfies NotFoundAction[],
} as const

export const LOADING_CONSTANTS = {
  SKELETON_COUNT: 6,

  TEXTS: {
    TITLE: 'Preparing your vibes…',
    DESCRIPTION: 'Fetching playlists and getting recommendations ready.',
  },
} as const

export const ROOT_LAYOUT_CONSTANTS = {
  METADATA: {
    title: 'Spotify Recs',
    description: 'Generate playlist recommendations using Spotify API',
  } satisfies Metadata,

  LOCALE: 'ro',

  HTML_ATTRIBUTES: {
    suppressHydrationWarning: true,
  },
} as const

export const CARD_CONSTANTS = {
  DATA_SLOTS: {
    CARD: 'card',
    HEADER: 'card-header',
    TITLE: 'card-title',
    DESCRIPTION: 'card-description',
    ACTION: 'card-action',
    CONTENT: 'card-content',
    FOOTER: 'card-footer',
  },
} as const

export const BUTTON_CONSTANTS = {
  DATA_SLOT: 'button',
  DEFAULT_AS_CHILD: false,
} as const

export const CONFIRM_DIALOG_CONSTANTS = {
  BUTTON_LABELS: {
    CANCEL: 'Cancel',
    CONFIRM: 'Remove',
  },
} as const

export const INPUT_CONSTANTS = {
  DATA_SLOT: 'input',
} as const

export const PLAYLIST_CARD_CONSTANTS = {
  LABELS: {
    NO_IMAGE: 'No image',
    SELECTED: 'Selected ✓',
    DEFAULT_DESCRIPTION: 'Used to inspire book and movie matches.',
    TRACKS_SUFFIX: 'tracks',
  },
  ALT_TEXT: {
    getCoverAlt: (playlistName: string) => `${playlistName} cover`,
  },
} as const

export const DROPDOWN_MENU_CONSTANTS = {
  DATA_SLOTS: {
    ROOT: 'dropdown-menu',
    PORTAL: 'dropdown-menu-portal',
    TRIGGER: 'dropdown-menu-trigger',
    CONTENT: 'dropdown-menu-content',
    GROUP: 'dropdown-menu-group',
    ITEM: 'dropdown-menu-item',
    CHECKBOX_ITEM: 'dropdown-menu-checkbox-item',
    RADIO_GROUP: 'dropdown-menu-radio-group',
    RADIO_ITEM: 'dropdown-menu-radio-item',
    LABEL: 'dropdown-menu-label',
    SEPARATOR: 'dropdown-menu-separator',
    SHORTCUT: 'dropdown-menu-shortcut',
    SUB: 'dropdown-menu-sub',
    SUB_TRIGGER: 'dropdown-menu-sub-trigger',
    SUB_CONTENT: 'dropdown-menu-sub-content',
  },
  DEFAULT_SIDE_OFFSET: 4,
  VARIANTS: {
    DEFAULT: 'default',
    DESTRUCTIVE: 'destructive',
  },
} as const

export const PLAYLIST_CAROUSEL_CONSTANTS = {
  DIMENSIONS: {
    CARD_WIDTH: 176,
    GAP: 20,
    MIN_CARDS_PER_PAGE: 1,
  },
  LABELS: {
    SELECTED_BADGE: 'Selected',
  },
  ANIMATION: {
    INITIAL: { opacity: 0, x: 50 },
    ANIMATE: { opacity: 1, x: 0 },
    EXIT: { opacity: 0, x: -50 },
    BADGE_INITIAL: { opacity: 0, scale: 0.9, y: -4 },
    BADGE_ANIMATE: { opacity: 1, scale: 1, y: 0 },
    BADGE_EXIT: { opacity: 0, scale: 0.9, y: -4 },
  },
} as const

export const RECOMMENDATION_CAROUSEL_CONSTANTS = {
  DIMENSIONS: {
    CARD_WIDTH: 176,
    GAP: 20,
    MIN_CARDS_PER_PAGE: 1,
  },
  LABELS: {
    NO_COVER: 'No cover',
    SAVED: 'Saved',
    ADD: 'Add',
  },
  ANIMATION: {
    MODE: 'popLayout',
    INITIAL: { opacity: 0, x: 20 },
    ANIMATE: { opacity: 1, x: 0 },
    EXIT: { opacity: 0, x: -20 },
  },
  getYearDisplay: (year: string) => `'${year.slice(-2)}`,
} as const
