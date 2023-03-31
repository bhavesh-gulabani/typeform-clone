const homeText = {
  header: 'Up-skilling requires time commitment',
  lineOne:
    'The GrowthX experience is designed by keeping in mind the working hours founders & full time operators typically work in.',
  lineTwo: 'You will spend',
  bulletPoints: {
    one: '- 6 hours/week for the first 5 weeks',
    two: '- 15 hours/week for the last 3 weeks',
  },
};

const formText = {
  firstName: {
    labelText: "What's your first name? *",
  },
  lastName: {
    labelTextOne: 'and your last name, ',
    labelTextTwo: '? *',
  },
  industry: {
    labelText: 'What industry is your company in? *',
    subLabelText: 'We will personalize your learning experience accordingly',
  },
  role: {
    labelText: 'Your role in your company? *',
    subLabelText: 'We want to understand how you spend your time right now.',
    roles: [
      ['A', 'Founder or CXO'],
      ['B', 'Product team'],
      ['C', 'Marketing team'],
      ['D', 'VC'],
    ],
  },
  professionalGoal: {
    labelText: ", what's your professional goal for the next 12 months? *",
    goals: {
      founder: [
        ['A', 'Structured approach to growth'],
        ['B', 'Build a growth team'],
        ['C', 'Connect with like-minded people'],
      ],
      others: [
        ['A', 'Get hired'],
        ['B', 'Get promoted'],
        ['C', 'Connect with like-minded people'],
        ['D', 'Structured approach to growth'],
        ['E', 'Build a growth team'],
      ],
    },
  },
  emailAddress: {
    labelText: "Email you'd like to register with? *",
    subLabelText:
      "We will keep all our communications with you through this email. Do check your spam inbox if you can't find our application received email.",
  },
  phoneNumber: {
    labelText: 'Your phone number *',
    subLabelText:
      "We won't call you unless it is absolutely required to process your application.",
  },
  success: {
    labelText: 'All done! Thanks for your time.',
  },
};

const errorMessages = {
  firstName: 'Please fill this in',
  lastName: 'Please fill this in',
  industry: 'Oops! Please make a selection',
  role: 'Oops! Please make a selection',
  professionalGoal: 'Oops! Please make a selection',
  professionalGoalErrors: [
    'Oops! Please make a selection',
    'Please select more choices',
  ],
  emailAddress: "Hmm... that email doesn't look right",
  emailAddressErrors: [
    'Please fill this in',
    "Hmm... that email doesn't look right",
  ],
  phoneNumber: "Hmm... that phone number doesn't look right",
  phoneNumberErrors: [
    'Numbers only please',
    'Please fill this in',
    "Hmm... that phone number doesn't look right",
    'Max characters reached',
  ],
};

const industries = [
  'Accounting',
  'Airlines/Aviation',
  'Alternative Dispute Resolution',
  'Alternative Medicine',
  'Animation',
  'Apparel & Fashion',
  'Architecture & Planning',
  'Arts and Crafts',
  'Automotive',
  'Aviation & Aerospace',
  'Banking',
  'Biotechnology',
  'Broadcast Media',
  'Building Materials',
  'Business Supplies and Equipment',
  'Capital Markets',
  'Chemicals',
  'Civic & Social Organization',
  'Civil Engineering',
  'Commercial Real Estate',
  'Computer & Network Security',
  'Computer Games',
  'Computer Hardware',
  'Computer Networking',
  'Computer Software',
  'Construction',
  'Consumer Electronics',
  'Crypto',
  'Consumer Goods',
  'Consumer Services',
  'Cosmetics',
  'Dairy',
  'Defense & Space',
  'Design',
  'Edtech',
  'Education Management',
  'E-Learning',
  'Electrical/Electronic Manufacturing',
  'Entertainment',
  'Environmental Services',
  'Events Services',
  'Executive Office',
  'Facilities Services',
  'Farming',
  'Financial Services',
  'Fine Art',
  'Fishery',
  'Food & Beverages',
  'Food Production',
  'Fund-Raising',
  'Furniture',
  'Gambling & Casinos',
  'Glass, Ceramics & Concrete',
  'Government Administration',
  'Government Relations',
  'Graphic Design',
  'Health, Wellness and Fitness',
  'Higher Education',
  'Hospital & Health Care',
  'Hospitality',
  'Human Resources',
  'Import and Export',
  'Individual & Family Services',
  'Industrial Automation',
  'Information Services',
  'Information Technology and Services',
  'Insurance',
  'International Affairs',
  'International Trade and Development',
  'Internet',
  'Investment Banking',
  'Investment Management',
  'Judiciary',
  'Law Enforcement',
  'Law Practice',
  'Legal Services',
  'Legislative Office',
  'Leisure, Travel & Tourism',
  'Libraries',
  'Logistics and Supply Chain',
  'Luxury Goods & Jewelry',
  'Machinery',
  'Management Consulting',
  'Maritime',
  'Marketing and Advertising',
  'Market Research',
  'Mechanical or Industrial Engineering',
  'Media Production',
  'Medical Devices',
  'Medical Practice',
  'Mental Health Care',
  'Military',
  'Mining & Metals',
  'Motion Pictures and Film',
  'Museums and Institutions',
  'Music',
  'Nanotechnology',
  'Newspapers',
  'Nonprofit Organization Management',
  'Oil & Energy',
  'Online Media',
  'Outsourcing/Offshoring',
  'Package/Freight Delivery',
  'Packaging and Containers',
  'Paper & Forest Products',
  'Performing Arts',
  'Pharmaceuticals',
  'Philanthropy',
  'Photography',
  'Plastics',
  'Political Organization',
  'Primary/Secondary Education',
  'Printing',
  'Professional Training & Coaching',
  'Program Development',
  'Public Policy',
  'Public Relations and Communications',
  'Public Safety',
  'Publishing',
  'Railroad Manufacture',
  'Ranching',
  'Real Estate',
  'Recreational Facilities and Services',
  'Religious Institutions',
  'Renewables & Environment',
  'Research',
  'Restaurants',
  'Retail',
  'Security and Investigations',
  'Semiconductors',
  'Shipbuilding',
  'Sporting Goods',
  'Sports',
  'Staffing and Recruiting',
  'Supermarkets',
  'Telecommunications',
  'Textiles',
  'Think Tanks',
  'Tobacco',
  'Translation and Localization',
  'Transportation/Trucking/Railroad',
  'Utilities',
  'Venture Capital & Private Equity',
  'Veterinary',
  'Warehousing',
  'Wholesale',
  'Wine and Spirits',
  'Wireless',
  'Writing and Editing',
];

const apiURL = 'https://eo3oi83n1j77wgp.m.pipedream.net';

export { homeText, formText, errorMessages, industries, apiURL };
