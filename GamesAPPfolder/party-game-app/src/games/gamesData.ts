export interface Game {
  id: string;
  name: string;
  description: string;
  rules: string[];
  videoUrl?: string;
  tags: {
    type: string[];
    playerCount: {
      min: number;
      max: number;
    };
    duration: string;
    difficulty: 'easy' | 'medium' | 'hard';
  };
}

export const games: Game[] = [
  {
    id: 'word-chain',
    name: 'Word Chain',
    description: 'A fast-paced word game where players take turns creating chains of words. Each word must begin with the last letter of the previous word!',
    rules: [
      'Players take turns saying words',
      'Each word must begin with the last letter of the previous word',
      'No repeating words allowed',
      'Players have a short time limit to respond',
      'If a player can\'t think of a word, they are eliminated',
      'Last player standing wins'
    ],
    videoUrl: 'https://www.youtube.com/embed/example-word-chain',
    tags: {
      type: ['word-play', 'quick', 'elimination'],
      playerCount: {
        min: 2,
        max: 8
      },
      duration: '5-10 minutes',
      difficulty: 'easy'
    }
  },
  {
    id: 'story-circle',
    name: 'Story Circle',
    description: 'Create hilarious stories together! Each player adds one sentence to the story, building on what others have said.',
    rules: [
      'Players sit in a circle',
      'First player starts the story with one sentence',
      'Each player adds one sentence to continue the story',
      'No planning or discussing the story allowed',
      'Story continues until it reaches a natural end',
      'Players can pass their turn if stuck'
    ],
    videoUrl: 'https://www.youtube.com/embed/example-story-circle',
    tags: {
      type: ['storytelling', 'creative', 'party'],
      playerCount: {
        min: 3,
        max: 10
      },
      duration: '15-20 minutes',
      difficulty: 'easy'
    }
  },
  {
    id: 'quick-draw',
    name: 'Quick Draw',
    description: 'Draw and guess with a time limit! Perfect for quick rounds of artistic fun.',
    rules: [
      'Players take turns being the drawer',
      'Drawer picks a word card',
      'Limited time to draw the word',
      'Other players try to guess what is being drawn',
      'No letters or numbers allowed in drawings',
      'First correct guess wins the round'
    ],
    videoUrl: 'https://www.youtube.com/embed/example-quick-draw',
    tags: {
      type: ['drawing', 'quick', 'word-guessing'],
      playerCount: {
        min: 2,
        max: 6
      },
      duration: '5-10 minutes',
      difficulty: 'easy'
    }
  },
  {
    id: 'charades',
    name: 'Charades',
    description: 'A classic party game where players act out words or phrases without speaking, while others try to guess what they are portraying.',
    rules: [
      'Players take turns being the actor',
      'The actor draws a word or phrase from a hat/container',
      'The actor must act out the word/phrase without speaking or making sounds',
      'Other players try to guess what is being acted out',
      'The actor can nod or shake their head to indicate if guesses are correct',
      'First correct guess wins the round',
      'Players can pass on their turn if they get stuck'
    ],
    videoUrl: 'https://www.youtube.com/embed/example-charades',
    tags: {
      type: ['acting', 'word-guessing', 'non-verbal'],
      playerCount: {
        min: 4,
        max: 12
      },
      duration: '15-30 minutes',
      difficulty: 'easy'
    }
  },
  {
    id: 'pictionary',
    name: 'Pictionary',
    description: 'A drawing and guessing game where players draw pictures to represent words while their teammates try to guess what they are drawing.',
    rules: [
      'Players are divided into teams',
      'Each team takes turns having one player draw',
      'The drawer picks a word card and has a limited time to draw it',
      'Team members try to guess the word being drawn',
      'No letters, numbers, or verbal communication allowed while drawing',
      'First correct guess wins the round',
      'Teams take turns until a winning score is reached'
    ],
    videoUrl: 'https://www.youtube.com/embed/example-pictionary',
    tags: {
      type: ['drawing', 'word-guessing', 'team-based'],
      playerCount: {
        min: 4,
        max: 16
      },
      duration: '30-45 minutes',
      difficulty: 'medium'
    }
  },
  {
    id: 'telephone',
    name: 'Telephone',
    description: 'A communication game where a message is whispered from person to person, often resulting in hilarious distortions of the original message.',
    rules: [
      'Players sit in a circle or line',
      'First player thinks of a message and whispers it to the next player',
      'Each player whispers what they heard to the next player',
      'No repeating or asking for clarification allowed',
      'Last player says the message out loud',
      'Original message is revealed for comparison',
      'Players can rotate positions for new rounds'
    ],
    videoUrl: 'https://www.youtube.com/embed/example-telephone',
    tags: {
      type: ['communication', 'word-play', 'social'],
      playerCount: {
        min: 4,
        max: 12
      },
      duration: '10-20 minutes',
      difficulty: 'easy'
    }
  }
]; 