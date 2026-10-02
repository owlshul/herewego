// =============================================================================
// HEREWEGO DATA STORE — MA POLITICAL SCIENCE (NORTH CAMPUS, DELHI UNIVERSITY)
// Batch 2026-2028 | Curated by Anshul
// "Ah shit, here we go again." — Minimalist, clean single source of truth.
// =============================================================================

const portalData = {
  portal: {
    name: "herewego",
    badge: "MA PolSci · North Campus DU",
    motto: "“Ah shit, here we go again.”",
    submotto: "The unofficial single source of truth for tests, verified syllabi, drive readings, and notices.",
    batch: "MA Political Science (2026–2028)",
    campus: "North Campus, University of Delhi",
    classroom: "Room No. 18, Satyakam Bhawan",
    lastUpdated: "2 October 2026, 10:45 AM IST",
    curator: "Anshul"
  },

  // ---------------------------------------------------------------------------
  // MERGED ANNOUNCEMENTS & VERIFIED CITATIONS (One unified dispute-settler feed)
  // ---------------------------------------------------------------------------
  verifiedAnnouncements: [
    {
      id: "va-ir-unit1-readings",
      title: "IR Unit 1: Specific Chapters for Hobson and Tickner Books Confirmed",
      date: "2 Oct 2026, 10:45 AM",
      sender: "Kritartha",
      source: "WhatsApp (MAPS Unfiltered / Batch Discussion)",
      type: "readings",
      priority: true,
      summary: "Prof. Navnita C. Behera covered the Introduction and Conclusion from John Hobson's book in class. For Tickner's book, cover the Introduction.",
      exactQuote: "Navnita ma'am covered the intro and conclusion from Hobson's book. I'm assuming it'd be best to cover intro from Tickner's book.",
      tags: ["#CC103", "#IR", "#Unit1", "#Hobson", "#Tickner", "#Readings"]
    },
    {
      id: "va-ir-readings-1",
      title: "IR: 2 Readings Uploaded for Post Modernism & Post Structuralism (Devetak & Campbell)",
      date: "2 Oct 2026, 10:30 AM",
      sender: "Kritartha",
      source: "WhatsApp (MAPS Unfiltered / Batch Discussion)",
      type: "readings",
      priority: true,
      summary: "2 readings uploaded to Drive for Post Modernism and Post Structuralism: One by Richard Devetak (~25–30 pages) and one by David Campbell (~20–22 pages), both chapters in broader books.",
      exactQuote: "2 readings have been uploaded on the drive folder: One by Richard Devetak, the other by David Campbell. Chapters in broader books. Devetak ka 25-30pgs ka hai, Campbell waala 20-22pgs.",
      tags: ["#CC103", "#IR", "#PostModernism", "#Devetak", "#Campbell", "#Readings"]
    },
    {
      id: "va-ktpp-sujal-final",
      title: "KTPP Continuous Assessment: 16 Marks (Attempt 1 of 2) & Crucial Strategy Warning",
      date: "1 Oct 2026, 9:00 PM",
      sender: "Sujal Vishwakarma (CR)",
      source: "WhatsApp: North Campus Announcements (Core Papers)",
      type: "assessment",
      priority: true,
      summary: "Official pattern confirmed for Friday, 9 October: Total 16 Marks (1 question to be answered out of 2). Topics: Rousseau & Interpretation of Text (Main Focus on Skinner). Warning: Do not prepare only one topic thinking there is choice — questions can be interrelated or drawn from the same topic.",
      exactQuote: "Regarding Continuous Assessment of CC-Key Texts In Political Philosophy on 9th October' Friday. Total 16 Mark (1 Question), 2 Questions will be there out of which only 1 needs to be answered. Rousseau and Interpretation of Text (Main Focus on Skinner). And don't think that since there is an option so you can either prepare Skinner or Rousseau. Both the questions can be interrelated or can be from the same topic.",
      tags: ["#CC101", "#KTPP", "#ContinuousAssessment", "#Warning", "#16Marks"]
    },
    {
      id: "va-ir-final",
      title: "IR Internal Assessment Confirmed for 9 Oct (24 Marks · 3 Qs, Attempt 2)",
      date: "1 Oct 2026, 5:52 PM",
      sender: "Sachin Choudhary (+91 70666 08751) & Drishti CR (+91 96965 33151)",
      source: "WhatsApp (North Campus Core Papers & South Campus Announcements)",
      type: "assessment",
      priority: true,
      summary: "24 Marks IA confirmed for Friday, 9 October 2026. Format: 3 questions of which 2 need to be attempted (2 × 12M = 24M). Syllabus: Eurocentrism & Multiple Births of IR, Critical Theory, Post-Modernism & Post-Structuralism.",
      exactQuote: "Regarding Internal Assessment of CC-Theories of International Relations on 9th October' Friday. Total 24 Marks. 3 Questions of which 2 needs to be attempted. Syllabus: Eurocentrism and Multiple Births of IR, Critical Theory, Post Modernism and Post Structuralism.",
      tags: ["#CC103", "#IR", "#Confirmed", "#9Oct", "#24Marks"]
    },
    {
      id: "va-dpii-final",
      title: "DPII Final Syllabus Confirmed: Unit I(b & c) and Unit IV(a) · 20 Marks",
      date: "1 Oct 2026, 5:50 PM",
      sender: "Sachin Choudhary (+91 70666 08751) / Prof. Ujjwal Kumar Singh",
      source: "WhatsApp (South Campus Group & Direct Chat)",
      type: "assessment",
      priority: true,
      summary: "Final syllabus confirmed for Friday, 9 October CA (20 Marks): Unit I covers Topic b (Indian Constitutionalism debates: Constituent Assembly) and Topic c (Freedoms, emergency provisions [not coming], preventive detention). Unit IV covers Topic a (Rule of Law & criminal law decolonization). Unit I(a) and Units II & III are excluded.",
      exactQuote: "Ye hai syllabus aaj south campus me sir ne bataya... Ye highlighted wala hai syllabus sir ne mark karaya hai aaj class me: Unit 1: (b) and (c) [emergency provisions (this is not coming)], Unit 4: (a).",
      tags: ["#CC102", "#DPII", "#Confirmed", "#9Oct", "#20Marks"]
    },
    {
      id: "va-ktpp-final",
      title: "KTPP Continuous Assessment on 9 Oct: 15 Marks (Rousseau vs Skinner) + 30 Oct CA",
      date: "1 Oct 2026, 12:57 PM",
      sender: "Akansha (+91 93115 38286 / Confirmed with Dr. Koiremba Singh)",
      source: "WhatsApp: South campus (Department of Political Science 2026-2028) 🎓",
      type: "assessment",
      priority: true,
      summary: "Continuous Assessment on 9 Oct is 15 Marks with an option between 2 questions (Rousseau: Social Contract or Quentin Skinner 1969; attempt 1 question). The second CA of 20 Marks is scheduled for Friday, 30 October 2026.",
      exactQuote: "guys I just confirmed with koiremba sir regarding the CA, so it has been reduced to 15 marks and there will be an option between 2 questions (Rousseau and skinner) and we will have to attend 1, the next CA of 20 marks will be on 30th Oct.",
      tags: ["#CC101", "#KTPP", "#Confirmed", "#9Oct", "#15Marks"]
    },
    {
      id: "va-sbc-1",
      title: "SBC Internal Assessment: Handwritten Assignment Due 20 Oct (12 Marks)",
      date: "28 Sept 2026, 10:15 PM",
      sender: "Drishti CR (+91 96965 33151) / North Campus Admins",
      source: "WhatsApp: Dept. Of political science (North campus) -- 2026-2028",
      type: "assessment",
      priority: true,
      summary: "Handwritten Assignment for SBC-Elections and Data-Driven Electoral Analysis (7-8 pages). Submit PDF on Google Classroom by 20th October (12 Marks).",
      exactQuote: "NOTICE @all Regarding Internal Assessment in SBC-Elections and Data-Driven Electoral Analysis. As part of the Internal Assessment please prepare a handwritten assignment on the topic: Why it is important to study elections from both micro and macro level? Discuss Various Methods of analysing Electoral Data and their importance in understanding voting behaviour. चुनाव का सूक्षम और वृहत दोनों स्तरो से अध्ययन करना क्यों महत्वपूर्ण है ? चुनावी आंकड़ों के विश्लेषण के विभिन्न तरीको और मतदाता व्यव्हार को समझने में उनके महत्व पर चर्चा करें। Submit it on Google Classroom by 20th October. Total 12 marks. 7 to 8 pages. It must be handwritten. Upload the pdf on Google Classroom after writing it.",
      tags: ["#SBC", "#ElectionsData", "#InternalAssessment", "#20Oct", "#Handwritten"]
    },
    {
      id: "va-4",
      title: "Rousseau Social Contract Reading (Judith R. Masters Translation)",
      date: "23 Sept 2026, 9:54 AM",
      sender: "Sujal Vishwakarma (CR)",
      source: "Official Announcements",
      type: "drive",
      priority: false,
      summary: "The prescribed Judith R. Masters & Roger D. Masters translation of Rousseau's On the Social Contract uploaded to Drive for CC-101 Unit III-c.",
      exactQuote: "Reading shared by Dr. Ningthoujam Koiremba Singh for CC-Key Texts In Political Philosophy Unit III-c (Rousseau-Social Contract) has been uploaded on the Google Drive..... Please check it.....",
      tags: ["#CC101", "#Rousseau", "#DriveUpload"]
    },
    {
      id: "va-5",
      title: "IR Unit III-a (Constructivism) Readings Uploaded",
      date: "22 Sept 2026, 10:04 AM",
      sender: "Sujal Vishwakarma (CR)",
      source: "Official Announcements",
      type: "drive",
      priority: false,
      summary: "Readings for Unit III-a Constructivism (Ted Hopf, Alexander Wendt, Christian Reus-Smit) uploaded to Drive by Dr. Robert Mizo.",
      exactQuote: "Readings shared by Dr. Robert Mizo for CC- Theories of International Relations Unit III-a (Constructivism) has been uploaded on the G Drive.... Please Check it.",
      tags: ["#CC103", "#IR", "#Constructivism"]
    },
    {
      id: "va-6",
      title: "KTPP 4 Thinkers Finalized for Semester 1",
      date: "22 Sept 2026, 1:28 PM",
      sender: "Sujal Vishwakarma (CR)",
      source: "Official Announcements",
      type: "syllabus",
      priority: false,
      summary: "The 4 thinkers selected for this semester: Plato (Republic), Rousseau (Social Contract), Simone de Beauvoir (The Second Sex), Nietzsche (Genealogy of Morals).",
      exactQuote: "These 4 thinkers will be taught as part of CC-Key Texts In Political Philosophy. (Unit 2) Plato-The Republic, (Unit 3) Rousseau-Social Contract, (Unit 4) Simone De Beauvoir-The Second Sex, (Unit 4) Nietzsche-On the Genealogy of Morals.",
      tags: ["#CC101", "#SyllabusPlan"]
    },
    {
      id: "va-8",
      title: "Historical Note: Faculty Decision on 25 Sept IR Test",
      date: "14 Sept 2026, 4:52 PM",
      sender: "Sujal Vishwakarma (CR)",
      source: "Official Announcements",
      type: "archive",
      priority: false,
      summary: "Record of faculty discussion regarding test scheduling during the 25 Sept cycle.",
      exactQuote: "Till now the internal of all the 3 core papers are on the same day i.e 25th September' Friday. I asked Megha ma'am to shift the dates further for IR but she said NO.",
      tags: ["#CC103", "#ScheduleArchive"]
    },
    {
      id: "va-9",
      title: "Historical Scope: Critical Theory Exclusion from 25 Sept CA-1",
      date: "17 Sept 2026, 9:17 AM",
      sender: "Sujal Vishwakarma (CR)",
      source: "Batch Discussion",
      type: "archive",
      priority: false,
      summary: "Critical theory was confirmed excluded from the 25 Sept IR CA-1 test.",
      exactQuote: "no... critical theory will not be there",
      tags: ["#CC103", "#ScopeArchive"]
    }
  ],

  // ---------------------------------------------------------------------------
  // UPCOMING ASSESSMENTS CYCLE (9 October 2026)
  // ---------------------------------------------------------------------------
  upcomingCycle: {
    title: "Upcoming Assessments Cycle",
    dateFormatted: "Friday, 9 October 2026",
    isoTarget: "2026-10-09T09:00:00+05:30",
    papers: [
      {
        id: "cc-102-dp-9oct",
        code: "PS-CC 102",
        name: "Democracy and Political Institutions in India",
        shortName: "DPII",
        date: "Friday, 9 October 2026",
        mode: "Continuous Assessment (CA)",
        totalMarks: 20,
        pattern: "Continuous Assessment · 20 Marks",
        status: "confirmed",
        statusText: "Syllabus Confirmed",
        faculty: "Prof. Ujjwal Kumar Singh",
        clarificationCallout: null,
        footnoteNote: {
          text: "Unit I Topic a (Ancient Indian Republics), Unit II (Dr. Garima Das and Dr. Binit Kumar Sinha), and Unit III are strictly excluded. This assessment strictly examines Prof. Ujjwal Kumar Singh's portion: Unit I (b & c) [emergency provisions excluded] and Unit IV (a).",
          citation: {
            sender: "Sachin Choudhary (+91 70666 08751)",
            date: "1 Oct 2026, 5:41 PM & 5:50 PM",
            source: "WhatsApp Chat (Direct & South Campus Group)",
            quote: "Ye hai syllabus aaj south campus me sir ne bataya... Ye highlighted wala hai syllabus sir ne mark karaya hai aaj class me. Emergency provisions test me nahi aa raha."
          }
        },
        syllabusCitation: {
          sender: "Sachin Choudhary (+91 70666 08751)",
          date: "1 Oct 2026, 5:41 PM & 5:50 PM",
          source: "WhatsApp (South Campus Group & Direct Chat)",
          quote: "Ye hai syllabus aaj south campus me sir ne bataya... Ye highlighted wala hai syllabus sir ne mark karaya hai aaj class me: Unit 1: (b) and (c) [emergency provisions (this is not coming)], Unit 4: (a)."
        },
        syllabusTopics: [
          {
            unit: "Unit I",
            unitTitle: "Historical Understanding of Democracy and Constitutionalism in India",
            topics: [
              "Topic b: Salient features of India constitutionalism: representation, key debates in the Constituent Assembly of India",
              "Topic c: Constitutional freedoms and reasonable restrictions, emergency provisions (this is not coming), first amendment, preventive detention and debate over extraordinary laws"
            ],
            // 1. Official DU Syllabus Prescribed Readings for Test Topics
            syllabusReadings: [
              {
                author: "Granville Austin (1966)",
                title: "The Indian Constitution: Cornerstone of a Nation (Introduction, Chapters 1, 2, 3 and 13)",
                url: "https://drive.google.com/file/d/1alrnI8bTcxXr-UfFgaEa2jmgR-34Qblq/view"
              },
              {
                author: "Granville Austin (1999)",
                title: "Working a Democratic Constitution: The Indian Experience (Democracy Rescued or Constitution Subverted: Emergency and 42nd Amendment)",
                url: "https://drive.google.com/file/d/1BQy9JS_2mCEqdi3ANX7g5OCoY200Eh9g/view"
              },
              {
                author: "Upendra Baxi (1997)",
                title: "Accumulation and Legitimacy: The Indian Constitution and State Formation (in Singh, M.P. and Chaube, S. K. eds. Indian Constitution: A Review)",
                url: "https://drive.google.com/file/d/1d_-c8cekO08XxXyrd1zeuGPItqb45K9c/view"
              },
              {
                author: "Arudra Burra (2018)",
                title: "Freedom of Speech in the Early Constitution: A Study of the Constitution (First Amendment) Bill (in Bhatia ed. The Indian Constituent Assembly)",
                url: null
              },
              {
                author: "Constituent Assembly of India (1949)",
                title: "CAD Volume IX: Proceedings on Draft Article 15-A, Personal Liberty and Procedure Established by Law (Article 22, Sept 15–16, 1949)",
                url: "http://164.100.47.194/loksabha/writereaddata/cadebatefiles/vol9.html"
              },
              {
                author: "Rohit De & Ornit Shani (2023)",
                title: "Assembling the Indian Constitution (Past and Present, 263:1)",
                url: null
              },
              {
                author: "Venkat Iyer (2000)",
                title: "Emergency Law in India: The Background and the Development of the Law (in States of Emergency, the Indian Experience)",
                url: null
              },
              {
                author: "Syama Prasad Mookerjee (1951 / 1990)",
                title: "Preventive Detention (Parliamentary Debates, 13 Feb 1951, Lok Sabha Secretariat, pp. 61–81)",
                url: "https://drive.google.com/file/d/1rhkImGqDBm0tPqikh1VBmWB0agSGG9CM/view"
              },
              {
                author: "Arvind Narrain (2022)",
                title: "Roots of the Emergency: Preventive Detention (in India's Undeclared Emergency: Constitutionalism and the Politics of Resistance)",
                url: null
              },
              {
                author: "Shylashri Shankar (2009)",
                title: "Scaling Justice: India's Supreme Court, Anti-terror Laws, and Social Rights (Oxford University Press)",
                url: null
              },
              {
                author: "Ujjwal Kumar Singh & Anupama Roy (2017)",
                title: "B. R. Ambedkar and the Ideas of Constitutionalism and Constitutional Democracy (Summerhill IIAS Review, XXIII:2)",
                url: null
              }
            ],
            // 2. Exact Unit Google Drive Folders (CR Maintained, Prof Shared, Archive)
            drives: [
              {
                name: "CR Maintained Drive · Unit 1 Folder",
                scope: "CR Maintained Folder containing Austin, Baxi, Bhatia, First Amendment debates, CAD Vol IX",
                url: "https://drive.google.com/drive/folders/1iUkZ2ItPesSLJL9G5rwJLdj-KhXVGpuV"
              },
              {
                name: "Prof Shared Drive · Unit 1 Folder",
                scope: "Faculty Shared Subfolder (polscience.du) · Contains Burra, CAD 12 Sept 1949, ssrn-1957588",
                url: "https://drive.google.com/drive/folders/1LveKm7f8jMRKodPKRWwuYE8sTM_-te4-"
              },
              {
                name: "Archive Drive · Unit 1 Folder",
                scope: "Previous Year Master Archive · Unit 1 (Democracy & Constitutionalism in India)",
                url: "https://drive.google.com/drive/folders/1LPajBK1-XYiApxgV9i8dllMzgK01mCeF"
              }
            ],
            // 3. Faculty References & Class Discussions (with WhatsApp proof + student contact info)
            // 3. Faculty References & Class Discussions
            classReadingsNote: "Readings referenced by Prof. Ujjwal Kumar Singh in class & verified in MAPS batch discussions:",
            classReadings: [
              {
                author: "Granville Austin",
                title: "The Indian Constitution: Cornerstone of a Nation & Working a Democratic Constitution",
                scope: "Constituent Assembly debates & constitutional architecture · Unit 1(b)",
                url: "https://drive.google.com/drive/folders/1iUkZ2ItPesSLJL9G5rwJLdj-KhXVGpuV"
              },
              {
                author: "Upendra Baxi",
                title: "Accumulation and Legitimacy: The Indian Constitution and State Formation (in Rajeev Bhargava ed.)",
                scope: "Debates on Indian constitutionalism and representation · Unit 1(b)",
                url: "https://drive.google.com/file/d/1d_-c8cekO08XxXyrd1zeuGPItqb45K9c/view"
              },
              {
                author: "Gautam Bhatia",
                title: "Article 22: Authoritarian Enclave / Offend, Shock, or Disturb: Free Speech under the Indian Constitution",
                scope: "Preventive detention & fundamental rights · Unit 1(c)",
                url: "https://drive.google.com/file/d/1h6riYeVxCohwRsxlGpogrkygvFsS8iKA/view"
              },
              {
                author: "Madhav Khosla",
                title: "The Indian Constitution: An Introduction",
                scope: "Preventive detention & fundamental rights framework · Unit 1(c)",
                url: null
              },
              {
                author: "Venkat Iyer",
                title: "States of Emergency in States of Asia: A Comparative Study (Preventive Detention)",
                scope: "Preventive Detention & Extraordinary Powers · Unit 1(c)",
                url: null
              },
              {
                author: "Constituent Assembly / Parliamentary Records",
                title: "First Amendment to the Constitution of India (Original Draft & Syama Prasad Mookerjee Debates)",
                scope: "Reasonable restrictions and debate over extraordinary laws · Unit 1(c)",
                url: "https://drive.google.com/file/d/1rhkImGqDBm0tPqikh1VBmWB0agSGG9CM/view"
              }
            ],
            classProofs: [
              {
                sender: "~ Radha sharma",
                chat: "WhatsApp (MAPS Unfiltered)",
                date: "1 Oct 2026, 4:28 PM",
                quote: "for preventive detention : 1. Austin, 2. Khosla, 3. Venkat iyer, 4. Gautam bhatia, 5. First amendment original draft"
              },
              {
                sender: "~ Krishna Shreyansh & Kritartha",
                chat: "WhatsApp (MAPS Unfiltered)",
                date: "1 Oct 2026, 4:30 PM – 4:32 PM",
                quote: "Constitutionalism nd debates -- Baxi and Austin's material... Baxi ka kaunsa? Accumulation and Legacy and Rajiv Bhargav waala? -> Haaanjii wahii dono"
              }
            ]
          },
          {
            unit: "Unit IV",
            unitTitle: "Rule of Law, Rights and Accountability",
            topics: [
              "Topic a: Rule of law and the decolonization of criminal law"
            ],
            // 1. Official DU Syllabus Prescribed Readings for Topic a
            syllabusReadings: [
              {
                author: "Upendra Baxi (2007)",
                title: "The Rule of Law in India (SUR – International Journal of Human Rights, 4:6)",
                url: "https://drive.google.com/file/d/1CrRAlk-Gy_ohPuoQK2C81MNt-DsT55ZM/view"
              },
              {
                author: "Arudra Burra (2016)",
                title: "What’s Colonial about Colonial Law (American University International Law Review, 31:2)",
                url: "https://drive.google.com/file/d/1Rlf9lQYE6_fHYEuTlHwTVkmy3Vg0lOlR/view"
              },
              {
                author: "Amit Shah (2023)",
                title: "Union Home Minister and Minister of Cooperation introduces the Bharatiya Nyaya Sanhita Bill in the Lok Sabha (PIB Release, 11 August 2023)",
                url: "https://drive.google.com/file/d/11YHrGU0BcywUbPojCZ2Rx3VaOC5V4S9w/view"
              }
            ],
            // 2. Exact Unit Google Drive Folders (Prof Shared, CR Maintained, Archive)
            drives: [
              {
                name: "Prof Shared Drive · Unit 4 Folder",
                scope: "Faculty Shared Subfolder (polscience.du) · Contains Burra, Baxi, Amit Shah BNSS PIB release",
                url: "https://drive.google.com/drive/folders/1sdPzuuK49RzaY_B9AXogy5TAYMJto9Yq"
              },
              {
                name: "CR Maintained Drive · CC-102 Master Folder",
                scope: "CR Maintained Folder · Curated by Shiva (Contains Unit 1 & Unit 4 course materials)",
                url: "https://drive.google.com/drive/folders/166AxhP1W9aM8lwP5-otJKD5hWrv0BEM6"
              },
              {
                name: "Archive Drive · Unit 4 Folder",
                scope: "Previous Year Master Archive · Unit 4 (Rule of law, rights and accountability)",
                url: "https://drive.google.com/drive/folders/1D0VqPfbICB5_CQbYGVy4QgGfxj6XJXFG"
              }
            ],
            // 3. Faculty References & Class Discussions
            classReadingsNote: "Readings referenced by Prof. Ujjwal Kumar Singh in class & verified in MAPS batch discussions:",
            classReadings: [
              {
                author: "Moiz Tundawala",
                title: "On India's post-colonial engagement with the Rule of Law (2013)",
                scope: "Referenced by Prof. Ujjwal Kumar Singh in class for Rule of Law & Decolonization",
                url: "https://drive.google.com/drive/folders/1sdPzuuK49RzaY_B9AXogy5TAYMJto9Yq"
              },
              {
                author: "A.V. Dicey",
                title: "Introduction to the Study of the Law of the Constitution (The Rule of Law)",
                scope: "Classical formulation of the Rule of Law · Unit 4(a)",
                url: null
              },
              {
                author: "Upendra Baxi",
                title: "The Rule of Law in India: Theory and Practice (SUR Journal) & The Crisis of the Indian Legal System",
                scope: "Critical perspective on post-colonial Rule of Law · Unit 4(a)",
                url: "https://drive.google.com/file/d/1CrRAlk-Gy_ohPuoQK2C81MNt-DsT55ZM/view"
              }
            ],
            classProofs: [
              {
                sender: "~ Radha sharma",
                chat: "WhatsApp (MAPS Unfiltered)",
                date: "1 Oct 2026, 4:28 PM",
                quote: "For rule of law: 1. Av dicey, 2. Moiz tundawala"
              },
              {
                sender: "Kritartha",
                chat: "WhatsApp (MAPS Unfiltered)",
                date: "1 Oct 2026, 4:31 PM",
                quote: "Phir Baxi ka rule of law waala nahin aayega? (Faculty repository includes 'upendra baxi.pdf')"
              }
            ]
          }
        ]
      },

      {
        id: "cc-101-ktpp-9oct",
        code: "PS-CC 101",
        name: "Key Texts in Political Philosophy",
        shortName: "KTPP",
        date: "Friday, 9 October 2026",
        mode: "Continuous Assessment (CA)",
        totalMarks: 16,
        pattern: "Continuous Assessment · 16 Marks (1 Question to be answered out of 2)",
        status: "confirmed",
        statusText: "Syllabus Confirmed",
        faculty: "Dr. Ningthoujam Koiremba Singh",
        warningCallout: {
          title: "Strategy Warning on Choice: Prepare Both Topics!",
          text: "Don't think that since there is an option so you can either prepare Skinner or Rousseau. Both the questions can be interrelated or can be from the same topic!",
          citation: {
            sender: "Sujal Vishwakarma (CR)",
            date: "1 Oct 2026",
            source: "WhatsApp: North Campus Announcements (Core Papers)",
            quote: "Regarding Continuous Assessment of CC-Key Texts In Political Philosophy on 9th October' Friday. Total 16 Mark (1 Question), 2 Questions will be there out of which only 1 needs to be answered. Rousseau and Interpretation of Text (Main Focus on Skinner). And don't think that since there is an option so you can either prepare Skinner or Rousseau. Both the questions can be interrelated or can be from the same topic."
          }
        },
        footnoteNote: {
          text: "Continuous Assessment on 9 Oct is 16 Marks (1 question out of 2). Covers Rousseau and Interpretation of Text (Main Focus on Skinner). Warning: Do not prepare only one topic thinking there is choice — questions can be interrelated or drawn from the same topic.",
          citation: {
            sender: "Sujal Vishwakarma (CR)",
            date: "1 Oct 2026",
            source: "WhatsApp: North Campus Announcements (Core Papers)",
            quote: "Regarding Continuous Assessment of CC-Key Texts In Political Philosophy on 9th October' Friday. Total 16 Mark (1 Question), 2 Questions will be there out of which only 1 needs to be answered. Rousseau and Interpretation of Text (Main Focus on Skinner). And don't think that since there is an option so you can either prepare Skinner or Rousseau. Both the questions can be interrelated or can be from the same topic."
          }
        },
        syllabusCitation: {
          sender: "Sujal Vishwakarma (CR)",
          date: "1 Oct 2026",
          source: "WhatsApp: North Campus Announcements (Core Papers)",
          quote: "Regarding Continuous Assessment of CC-Key Texts In Political Philosophy on 9th October' Friday. Total 16 Mark (1 Question), 2 Questions will be there out of which only 1 needs to be answered. Rousseau and Interpretation of Text (Main Focus on Skinner). And don't think that since there is an option so you can either prepare Skinner or Rousseau. Both the questions can be interrelated or can be from the same topic."
        },
        syllabusTopics: [
          {
            unit: "Unit I",
            unitTitle: "Introduction: Interpretation of Text (Focus on Skinner)",
            topics: [
              "Topic b: Theories of Interpretation (Main Focus on Quentin Skinner)"
            ],
            // 1. Official DU Syllabus Prescribed Readings
            syllabusReadings: [
              {
                author: "Quentin Skinner (1969)",
                title: "Meaning and Understanding in the History of Ideas (History and Theory, 8:1)",
                url: "https://drive.google.com/drive/folders/1HSORAokjkAHdZqDAiMqeVNSVDE_t8Yri?usp=drive_link"
              },
              {
                author: "Terence Ball (1988)",
                title: "Transforming Political Discourse: Political Theory and Critical Conceptual History (Oxford: Blackwell)",
                url: null
              }
            ],
            // 2. Exact Unit Google Drive Folders (CR Maintained, Archive)
            drives: [
              {
                name: "CR Maintained Drive · Unit 1 Folder",
                scope: "CR Maintained Folder · Meaning & Context (Dr. Koiremba Singh)",
                url: "https://drive.google.com/drive/folders/1xHO7J2e5F_PfqupD6mZhSHNTtb3n_4Yo"
              },
              {
                name: "Archive Drive · Unit 1 Folder",
                scope: "Previous Year Master Archive · Unit 1 Introduction (includes Quentin Skinner 1969 & Terence Ball)",
                url: "https://drive.google.com/drive/folders/1oAGSv69eXypOBmXShnu1Sam5l5AxUC0u"
              }
            ],
            // 3. Faculty References & Class Discussions
            classReadingsNote: "Readings for Interpretation of Text / Skinner (Choice of 1 question with Rousseau · Warning: questions may be interrelated):",
            classReadings: [
              {
                author: "Quentin Skinner",
                title: "Meaning and Understanding in the History of Ideas (1969)",
                scope: "Prescribed reading for Unit I Theories of Interpretation · Question option in 9 Oct CA",
                url: "https://drive.google.com/drive/folders/1HSORAokjkAHdZqDAiMqeVNSVDE_t8Yri?usp=drive_link"
              }
            ],
            classProofs: [
              {
                sender: "Sujal Vishwakarma (CR)",
                chat: "WhatsApp (North Campus Announcements)",
                date: "1 Oct 2026",
                quote: "Total 16 Mark (1 Question), 2 Questions will be there out of which only 1 needs to be answered. Rousseau and Interpretation of Text (Main Focus on Skinner). And don't think that since there is an option so you can either prepare Skinner or Rousseau. Both the questions can be interrelated or can be from the same topic."
              },
              {
                sender: "Akansha (+91 93115 38286)",
                chat: "WhatsApp (South Campus Pol Sci)",
                date: "1 Oct 2026, 12:57 PM",
                quote: "guys I just confirmed with koiremba sir regarding the CA... there will be an option between 2 questions (Rousseau and skinner) and we will have to attend 1"
              }
            ]
          },
          {
            unit: "Unit III",
            unitTitle: "Rousseau",
            topics: [
              "Topic c: Rousseau - Social Contract (Books 1 & 2)"
            ],
            // 1. Official DU Syllabus Prescribed Readings
            syllabusReadings: [
              {
                author: "Jean-Jacques Rousseau (1978 ed.)",
                title: "On the Social Contract, with the Geneva Manuscript and Political Economy (Judith R. Masters & Roger D. Masters Translation)",
                url: "https://drive.google.com/file/d/16QbinQGaVEMWM-x8K7QWqOhv4WSo9VG9/view?usp=drivesdk"
              }
            ],
            // 2. Exact Unit Google Drive Folders (CR Maintained, Archive, Prescribed File)
            drives: [
              {
                name: "CR Maintained Drive · Unit 3 Folder",
                scope: "CR Maintained Subfolder · Rousseau (Social Contract)",
                url: "https://drive.google.com/drive/folders/1VGh61u9W8u6yqREv8rxTEgU2BBc0ITko"
              },
              {
                name: "Archive Drive · Unit 3 Folder",
                scope: "Previous Year Master Archive · Unit 3 (Any one thinker)",
                url: "https://drive.google.com/drive/folders/1MESxR4QYgAdlsq6cvIHrDYICRp39juJz"
              },
              {
                name: "Prescribed Reading File · Social Contract PDF",
                scope: "Prescribed Judith R. Masters & Roger D. Masters Translation shared by Dr. Ningthoujam Koiremba Singh",
                url: "https://drive.google.com/file/d/16QbinQGaVEMWM-x8K7QWqOhv4WSo9VG9/view?usp=drivesdk"
              }
            ],
            // 3. Faculty References & Class Discussions
            classReadingsNote: "Prescribed translation shared by Dr. Ningthoujam Koiremba Singh for 9 Oct CA (Choice of 1 question with Skinner · Warning: questions may be interrelated):",
            classReadings: [
              {
                author: "Jean-Jacques Rousseau",
                title: "On the Social Contract (Judith R. Masters & Roger D. Masters Translation)",
                scope: "Read Book 1 (Chapters 1-9) & Book 2 · Question option in 9 Oct CA",
                url: "https://drive.google.com/file/d/16QbinQGaVEMWM-x8K7QWqOhv4WSo9VG9/view?usp=drivesdk"
              }
            ],
            classProofs: [
              {
                sender: "Sujal Vishwakarma (CR)",
                chat: "WhatsApp (North Campus Announcements)",
                date: "1 Oct 2026",
                quote: "Total 16 Mark (1 Question), 2 Questions will be there out of which only 1 needs to be answered. Rousseau and Interpretation of Text (Main Focus on Skinner). And don't think that since there is an option so you can either prepare Skinner or Rousseau. Both the questions can be interrelated or can be from the same topic."
              },
              {
                sender: "Akansha (+91 93115 38286)",
                chat: "WhatsApp (South Campus Pol Sci)",
                date: "1 Oct 2026, 12:57 PM",
                quote: "there will be an option between 2 questions (Rousseau and skinner) and we will have to attend 1"
              }
            ]
          }
        ]
      },

      {
        id: "cc-103-ir-9oct",
        code: "PS-CC 103",
        name: "Theories of International Relations",
        shortName: "IR",
        date: "Friday, 9 October 2026",
        mode: "Internal Assessment (IA)",
        totalMarks: 24,
        pattern: "3 Questions of which 2 need to be attempted (2 Qs × 12M = 24 Marks)",
        status: "confirmed",
        statusText: "Syllabus Confirmed",
        faculty: "Prof. Navnita C. Behera & Prof. Sanjeev Kumar HM",
        clarificationCallout: null,
        footnoteNote: {
          text: "Total 24 Marks Internal Assessment on Friday, 9 October 2026. The test will have 3 questions, of which students must attempt 2 questions (12 Marks each).",
          citation: {
            sender: "Sachin Choudhary (+91 70666 08751) & Drishti CR (+91 96965 33151)",
            date: "1 Oct 2026, 4:49 PM & 5:52 PM",
            source: "WhatsApp: North Campus Core Papers & South Campus Announcements",
            quote: "Regarding Internal Assessment of CC-Theories of International Relations on 9th October' Friday. Total 24 Marks. 3 Questions of which 2 needs to be attempted. Syllabus: Eurocentrism and Multiple Births of IR, Critical Theory, Post Modernism and Post Structuralism."
          }
        },
        syllabusCitation: {
          sender: "Sachin Choudhary (+91 70666 08751) & Drishti CR (+91 96965 33151)",
          date: "1 Oct 2026, 4:49 PM & 5:52 PM",
          source: "WhatsApp: North Campus Core Papers & South Campus Announcements",
          quote: "NOTICE: Regarding Internal Assessment of CC-Theories of International Relations on 9th October' Friday. Total 24 Marks. 3 Questions of which 2 needs to be attempted. Syllabus: Eurocentrism and Multiple Births of IR, Critical Theory, Post Modernism and Post Structuralism."
        },
        syllabusTopics: [
          {
            unit: "Unit I",
            unitTitle: "Introduction: Evolution of the Discipline",
            topics: [
              "Topic a: The Eurocentric Origin of the Discipline",
              "Topic b: Understanding the Multiple Births of the Discipline"
            ],
            // 1. Official DU Syllabus Prescribed Readings
            syllabusReadings: [
              {
                author: "Scott Burchill & Andrew Linklater (1996)",
                title: "Introduction, in Burchill et al. eds. Theories of International Relations (St Martin Press, pp. 67–92)",
                url: null
              },
              {
                author: "Martin Hollis & Steve Smith (1991)",
                title: "The Growth of a Discipline, in Explaining and Understanding International Relations (Oxford: Clarendon Press, pp. 16–44)",
                url: null
              },
              {
                author: "Milja Kurki & Colin Wight (2013)",
                title: "International Relations and Social Science, in International Relations Theories: Discipline and Diversity (pp. 14–35)",
                url: null
              },
              {
                author: "Stephen M. Walt (1998)",
                title: "International Relations: One World, Many Theories (Foreign Policy, 110, pp. 29–32)",
                url: null
              },
              {
                author: "Vineet Thakur, Alexander E. Davis & Peter Vale (2017)",
                title: "Imperial Mission, 'Scientific Method': An Alternative Account of the Origins of IR (Millennium: Journal of International Studies, 46:1, pp. 3–22)",
                url: null
              },
              {
                author: "Robert Vitalis (2005)",
                title: "Birth of a Discipline, in D. Long & B. C. Schmidt eds. Imperialism and Internationalism in the Discipline of International Relations (pp. 159–182)",
                url: null
              },
              {
                author: "John M. Hobson (2012)",
                title: "The Eurocentric Conception of World Politics: Western International Theory, 1760–2010 (Cambridge University Press)",
                url: "https://drive.google.com/drive/folders/11xfaZ6g-iP94C6K9yHCnkgLGrrLQZiZd"
              },
              {
                author: "Arlene B. Tickner & Ole Wæver / Steve Smith eds. (2009)",
                title: "International Relations Scholarship Around the World (Routledge)",
                url: "https://drive.google.com/drive/folders/11xfaZ6g-iP94C6K9yHCnkgLGrrLQZiZd"
              }
            ],
            // 2. Exact Unit Google Drive Folders (CR Maintained, Archive)
            drives: [
              {
                name: "CR Maintained Drive · Unit 1 Folder",
                scope: "CR Maintained Subfolder · Eurocentric Origins & Multiple Births of IR",
                url: "https://drive.google.com/drive/folders/11xfaZ6g-iP94C6K9yHCnkgLGrrLQZiZd"
              },
              {
                name: "Archive Drive · Unit 1 Folder",
                scope: "Previous Year Master Archive · Unit 1 (Introduction: Evolution of the discipline)",
                url: "https://drive.google.com/drive/folders/1disnm4OTbVrbBGP3DQANj5aOvP6g4HWp"
              }
            ],
            // 3. Faculty References & Class Discussions
            classReadingsNote: "Specific chapters covered by Prof. Navnita C. Behera in class (verified by Kritartha):",
            classReadings: [
              {
                author: "John M. Hobson",
                title: "The Eurocentric Conception of World Politics (2012) — Introduction & Conclusion",
                scope: "Taught by Prof. Navnita C. Behera in class · Cover Intro & Conclusion",
                url: "https://drive.google.com/drive/folders/11xfaZ6g-iP94C6K9yHCnkgLGrrLQZiZd"
              },
              {
                author: "Arlene B. Tickner & Steve Smith",
                title: "International Relations Scholarship Around the World (2009) — Introduction",
                scope: "Cover Introduction (batch discussion confirmation)",
                url: "https://drive.google.com/drive/folders/11xfaZ6g-iP94C6K9yHCnkgLGrrLQZiZd"
              }
            ],
            classProofs: [
              {
                sender: "Kritartha",
                chat: "WhatsApp (MAPS Unfiltered / Batch Discussion)",
                date: "2 Oct 2026, 10:45 AM",
                quote: "Navnita ma'am covered the intro and conclusion from Hobson's book. I'm assuming it'd be best to cover intro from Tickner's book."
              }
            ]
          },
          {
            unit: "Unit II",
            unitTitle: "Major Paradigms in IR",
            topics: [
              "Topic c: Critical Theory"
            ],
            // 1. Official DU Syllabus Prescribed Readings
            syllabusReadings: [
              {
                author: "Richard Devetak (1996)",
                title: "Critical Theory, in Burchill et al. eds. Theories of International Relations (Macmillan Press, pp. 145–178)",
                url: null
              },
              {
                author: "Richard Devetak (2014)",
                title: "A Rival Enlightenment? Critical International Theory in Historical Mode (International Theory, 6:3, pp. 417–453)",
                url: null
              },
              {
                author: "Andrew Linklater (2006)",
                title: "Realism, Marxism and Critical International Theory, in Chan & Moore eds. Theories of International Relations, Vol. 3 (Sage, pp. 110–125)",
                url: null
              },
              {
                author: "Justin Rosenberg (1994)",
                title: "Social Structures and Geopolitical Systems, in The Empire of Civil Society (Verso, pp. 54–58)",
                url: null
              },
              {
                author: "Benno Teschke (2003)",
                title: "The Myth of 1648: Class, Geopolitics and the Making of Modern International Relations (Bath Press, pp. 1–12, 42–46)",
                url: null
              }
            ],
            // 2. Exact Unit Google Drive Folders (CR Maintained, Archive)
            drives: [
              {
                name: "CR Maintained Drive · Unit 2 Folder",
                scope: "CR Maintained Subfolder · Marxism, Neo-Marxism & Critical Theory (Dr. Robert Mizo)",
                url: "https://drive.google.com/drive/folders/1zE156TnEDLHwdK2oxEcNTCpurzlICC8Y"
              },
              {
                name: "Archive Drive · Unit 2 Folder",
                scope: "Previous Year Master Archive · Unit 2 (Major Paradigms in IR)",
                url: "https://drive.google.com/drive/folders/1uGX3fSL21D7xQRJiOJlUnoTByvgxCLjf"
              }
            ],
            // 3. Faculty References & Class Discussions
            classReadingsNote: "Notice confirms Critical Theory is included in the 9 Oct IA (attempt 2 of 3 questions). Specific chapter/article selection by faculty awaited.",
            classReadings: []
          },
          {
            unit: "Unit III",
            unitTitle: "Alternative Approaches in IR",
            topics: [
              "Topic c: Post-Modernism and Post-Structuralism"
            ],
            // 1. Official DU Syllabus Prescribed Readings
            syllabusReadings: [
              {
                author: "Richard Devetak (1996)",
                title: "Post-Modernism, in Burchill & Linklater eds. Theories of International Relations (St Martin Press, pp. 179–209 / ~25–30 pages)",
                url: "https://drive.google.com/drive/folders/1mZUaRhTbhNi35fEB3RDYP-Vb9kap5WuT"
              },
              {
                author: "David Campbell (2013)",
                title: "Poststructuralism, in Tim Dunne, M. Kurki & S. Smith eds. International Relations Theories: Discipline and Diversity (Oxford University Press, pp. 223–246 / ~20–22 pages)",
                url: "https://drive.google.com/drive/folders/1mZUaRhTbhNi35fEB3RDYP-Vb9kap5WuT"
              },
              {
                author: "Pauline Marie Rosenau (1992)",
                title: "Post-Modernism and the Social Sciences: Insights, Inroads and Intrusions (Princeton University Press, pp. 3–41)",
                url: null
              }
            ],
            // 2. Exact Unit Google Drive Folders (CR Maintained, Archive)
            drives: [
              {
                name: "CR Maintained Drive · Unit 3 Folder",
                scope: "CR Maintained Subfolder · Post-Modernism & Post-Structuralism (Dr. Megha · contains Devetak & Campbell)",
                url: "https://drive.google.com/drive/folders/1mZUaRhTbhNi35fEB3RDYP-Vb9kap5WuT"
              },
              {
                name: "Archive Drive · Unit 3 Folder",
                scope: "Previous Year Master Archive · Unit 3 (Alternative Approaches in IR)",
                url: "https://drive.google.com/drive/folders/1MF8UJdQ52dAWW9h4AqVHp2dXInnfKeBj"
              }
            ],
            // 3. Faculty References & Class Discussions
            classReadingsNote: "2 readings uploaded on Google Drive folder for Post-Modernism & Post-Structuralism (verified by Kritartha):",
            classReadings: [
              {
                author: "Richard Devetak",
                title: "Post-Modernism (Chapter in 'Theories of International Relations', pp. 179–209 / ~25–30 pages)",
                scope: "Uploaded on Drive folder · ~25–30 pages",
                url: "https://drive.google.com/drive/folders/1mZUaRhTbhNi35fEB3RDYP-Vb9kap5WuT"
              },
              {
                author: "David Campbell",
                title: "Poststructuralism (Chapter in 'International Relations Theories: Discipline and Diversity', ~20–22 pages)",
                scope: "Uploaded on Drive folder · ~20–22 pages",
                url: "https://drive.google.com/drive/folders/1mZUaRhTbhNi35fEB3RDYP-Vb9kap5WuT"
              }
            ],
            classProofs: [
              {
                sender: "Kritartha",
                chat: "WhatsApp (MAPS Unfiltered / Batch Discussion)",
                date: "2 Oct 2026, 10:30 AM – 10:34 AM",
                quote: "2 readings have been uploaded on the drive folder: One by Richard Devetak, the other by David Campbell. Chapters in broader books. Devetak ka 25-30pgs ka hai, Campbell waala 20-22pgs."
              }
            ]
          }
        ]
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // SKILL-BASED COURSE (SBC) INTERNAL ASSESSMENT (Due 20 October 2026)
  // ---------------------------------------------------------------------------
  sbcAssessment: {
    id: "sbc-elections-ia-20oct",
    code: "PS-SBC 01",
    name: "Elections and Data-Driven Electoral Analysis",
    shortName: "SBC",
    category: "Skill-Based Course (SBC)",
    type: "Internal Assessment (Handwritten Assignment)",
    deadlineFormatted: "Tuesday, 20 October 2026",
    isoDeadline: "2026-10-20T23:59:59+05:30",
    totalMarks: 12,
    pageRequirement: "7 to 8 Pages (Strictly Handwritten)",
    submissionMode: "Google Classroom (PDF Upload)",
    faculty: "Dr. Sudhir Singh, Dr. Sitaram Kumbhakar, Dr. Anjali Yogi & Dr. Shivam Choudhary",
    status: "active",
    statusText: "Active Assignment · Due 20 Oct",
    topicEnglish: "Why it is important to study elections from both micro and macro level? Discuss Various Methods of analysing Electoral Data and their importance in understanding voting behaviour.",
    topicHindi: "चुनाव का सूक्षम और वृहत दोनों स्तरो से अध्ययन करना क्यों महत्वपूर्ण है ? चुनावी आंकड़ों के विश्लेषण के विभिन्न तरीको और मतदाता व्यव्हार को समझने में उनके महत्व पर चर्चा करें।",
    guidelines: [
      "Assignment must be strictly handwritten (7 to 8 pages in length).",
      "Total 12 marks allocated for internal continuous assessment.",
      "Scan clearly and compile into a single organized PDF file.",
      "Upload the PDF directly to the official Google Classroom portal.",
      "Submission deadline: Tuesday, 20th October 2026."
    ],
    citation: {
      sender: "Drishti CR (+91 96965 33151) / North Campus Admins",
      date: "28 Sept 2026, 10:15 PM",
      source: "WhatsApp: Dept. Of political science (North campus) -- 2026-2028",
      quote: "NOTICE @all Regarding Internal Assessment in SBC-Elections and Data-Driven Electoral Analysis. As part of the Internal Assessment please prepare a handwritten assignment on the topic: Why it is important to study elections from both micro and macro level? Discuss Various Methods of analysing Electoral Data and their importance in understanding voting behaviour. चुनाव का सूक्षम और वृहत दोनों स्तरो से अध्ययन करना क्यों महत्वपूर्ण है ? चुनावी आंकड़ों के विश्लेषण के विभिन्न तरीको और मतदाता व्यव्हार को समझने में उनके महत्व पर चर्चा करें। Submit it on Google Classroom by 20th October. Total 12 marks. 7 to 8 pages. It must be handwritten. Upload the pdf on Google Classroom after writing it."
    }
  },

  // ---------------------------------------------------------------------------
  // CONCLUDED ASSESSMENTS ARCHIVE (25 September 2026)
  // ---------------------------------------------------------------------------
  concludedCycle: {
    title: "Concluded Assessments Archive",
    heldOn: "Friday, 25 September 2026",
    summary: "The initial core internal examination cycle. Readings and syllabus records are preserved for end-semester revision.",
    papers: [
      {
        code: "PS-CC 101",
        name: "Key Texts in Political Philosophy",
        shortName: "KTPP",
        pattern: "2 questions of 12 marks each",
        syllabus: "Plato's Republic (Books I-V) & Simone de Beauvoir's The Second Sex (Miranda Ma'am selected pages)",
        readings: [
          {
            title: "The Republic of Plato (Allan Bloom translation, Books I-V)",
            author: "Plato / Allan Bloom",
            url: "https://drive.google.com/file/d/1RZc5_iPzKua1Z8otGHtCO9QCJvaC86uV/view?usp=drivesdk"
          },
          {
            title: "The Second Sex (Vintage 2011)",
            author: "Simone de Beauvoir",
            url: "https://drive.google.com/file/d/1P1we6DY0JClj6TZ0YeRAcD5-gqC4yjuY/view?usp=drivesdk",
            note: "Pages: 45, 73, 75, 77, 79, 82, 84, 94, 95, 96, 102, 210, 214, 351, 357, 358, 359, 360, 368, 369, 370, 390, 583, 584, 647"
          }
        ]
      },
      {
        code: "PS-CC 102",
        name: "Democracy and Political Institutions in India",
        shortName: "DPII",
        pattern: "2 questions of 12 marks each",
        syllabus: "Unit II: Judiciary (Dr. Garima Das) & Executive (Dr. Binit Sinha)",
        driveFolders: [
          { name: "DPII Unit II Drive", url: "https://drive.google.com/drive/folders/1ImGOgRxgfoC4hB7uj8KHNg_iUMLM0j1G" },
          { name: "Dr. Garima Das Folder", url: "https://drive.google.com/drive/folders/1TyikpmR22wYD0dS_ZrHu3N0oK5G6Gx0D" },
          { name: "Dr. Binit Folder", url: "https://drive.google.com/drive/folders/1S54O_YG-ehDYdKYBdcRo5loh3KC-P3mu" }
        ],
        readings: [
          {
            title: "The Supreme Court and Custody of Constitution",
            author: "Granville Austin",
            url: "https://drive.google.com/file/d/1TlymsPpxmybqOOsBLGMmLKh57wwQ_N22/view?usp=drivesdk"
          },
          {
            title: "Taking Suffering Seriously: Social Action Litigation in the Supreme Court of India",
            author: "Upendra Baxi",
            url: "https://drive.google.com/file/d/1MzaPJTS5jnXQk5Ti5bLqF8_KMVqwUWcf/view?usp=drivesdk"
          },
          {
            title: "India's Judiciary: The Promise of Uncertainty",
            author: "Pratap Bhanu Mehta",
            url: "https://drive.google.com/file/d/1KP-YMpZfSmaDoKOxfAzFwDg5kIpqbheR/view?usp=drivesdk"
          },
          {
            title: "The Supreme Court (Oxford Handbook)",
            author: "Madhav Khosla & Ananth Padmanabhan",
            url: "https://drive.google.com/file/d/1-EUirU6tlIqmhulzFA6yqeZgvQqQ_m2Z/view?usp=drivesdk"
          },
          {
            title: "Judicial Review, Judicial Activism: Need for Caution",
            author: "Justice A.S. Anand",
            url: "https://drive.google.com/file/d/1DEEOEQv6A0Z8xYLz3F6t7MxouluBzd24/view?usp=drivesdk"
          }
        ]
      },
      {
        code: "PS-CC 103",
        name: "Theories of International Relations",
        shortName: "IR",
        pattern: "CA-1 for 20 Marks (4 compulsory questions of 5 marks each, no choice)",
        syllabus: "Realism, Liberalism, Marxism & Neo-Marxism, Feminism",
        driveFolders: [
          { name: "Unit II Drive (Realism, Liberalism, Marxism)", url: "https://drive.google.com/drive/folders/1zE156TnEDLHwdK2oxEcNTCpurzlICC8Y" },
          { name: "Unit III-b Feminism Drive", url: "https://drive.google.com/drive/folders/1F3ha4_OF57EmORV3UvDxXuZqmgy8CUfJ" }
        ],
        readings: [
          { title: "Realism", author: "Jack Donnelly", url: "https://drive.google.com/file/d/1Kh2VKtdTPx_ctg6HDuI9ehsF6aAHNIf8/view?usp=drivesdk" },
          { title: "Morgenthau's Principles: Feminist Reformulation", author: "J. Ann Tickner", url: "https://drive.google.com/file/d/1nwBp6dLWpH34XcztiWMPazUk9Ow96jEK/view?usp=drivesdk" },
          { title: "Structural Realism and Beyond", author: "Robert O. Keohane", url: "https://drive.google.com/file/d/1-ziggk6uD1aVlnwa65Q01YgArPJiem_G/view?usp=drivesdk" },
          { title: "The Poverty of Neorealism", author: "Richard K. Ashley", url: "https://drive.google.com/file/d/1x-PvUZ32ZHGlfnNp7hPKR2Yq88mh8Ubc/view?usp=drivesdk" },
          { title: "The Timeless Wisdom of Realism?", author: "Barry Buzan", url: "https://drive.google.com/file/d/1OsZnG0sQ8yNAJmvMIv6X5WsRaNbiYV_0/view?usp=drivesdk" },
          { title: "Subaltern Realism", author: "Mohammed Ayoob", url: "https://drive.google.com/file/d/1i-mcgd7M0OHSmSSmljRne27bbqDZFClm/view?usp=drivesdk" },
          { title: "Liberalism", author: "Scott Burchill", url: "https://drive.google.com/file/d/1CZ5pzqicayefa2mQEe9ZzXYI0Q80tyKF/view?usp=drivesdk" },
          { title: "Neoliberalism, Neorealism, and World Politics", author: "David A. Baldwin", url: "https://drive.google.com/file/d/1Ych2KcjWxWra0Ub87QHS8Ls3CHpOf5OE/view?usp=drivesdk" },
          { title: "Marxism", author: "Andrew Linklater", url: "https://drive.google.com/file/d/1v9_C4n2V5EmzP-l6ZjRjalzRR-1TDTQq/view?usp=drivesdk" },
          { title: "Modern World-System as Capitalist Economy", author: "Immanuel Wallerstein", url: "https://drive.google.com/file/d/1naRsWvPDe18PwmvmHX6_gLtMljw5WT7k/view?usp=drivesdk" },
          { title: "Social Forces, States and World Orders", author: "Robert Cox", url: "https://drive.google.com/file/d/1bqGghxvhxgod3YRIz9W4L4k9mvaxvBxI/view?usp=drivesdk" },
          { title: "Gramsci, Hegemony and International Relations", author: "Robert Cox", url: "https://drive.google.com/file/d/1IZrqNLNUHSAX3vftJBxBAFALpRO2IEY1/view?usp=drivesdk" },
          { title: "Feminism", author: "Jacqui True", url: "https://drive.google.com/file/d/1KT4y7Q7JE37fPGqNroyVERVY6HxzxCZr/view?usp=drivesdk" },
          { title: "Feminist Theory and Gender Studies in IR", author: "Christine Sylvester", url: "https://drive.google.com/file/d/1bnulL7oXniE9ihZyo-vXua-n8skw-is6/view?usp=drivesdk" }
        ]
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // MASTER DRIVES & IMPORTANT LINKS (CATEGORIZED)
  // ---------------------------------------------------------------------------
  drivesSections: [
    {
      categoryId: "drives",
      categoryTitle: "Master Course Drives",
      categoryDesc: "Central CR drive, faculty shared drives, and semester-wide archives.",
      items: [
        {
          id: "drive-central",
          name: "CR Maintained Drive (North Campus)",
          curatorLabel: "Maintained by",
          curators: "Sujal Vishwakarma / CRs",
          url: "https://drive.google.com/drive/folders/14aDMmng2MdpaOqH-WRKY724J598sfuJx",
          badge: "CR Maintained Drive",
          btnText: "Open Drive Repository"
        },
        {
          id: "drive-dpii-garima",
          name: "Faculty Shared Drive (DPII)",
          curatorLabel: "Shared by",
          curators: "Dr. Garima Das · Suggested by Prof. Ujjwal Kumar Singh",
          url: "https://drive.google.com/drive/folders/1gL9IVzLxIhe4BSoghS_FbXaAT6qkcTjZ",
          badge: "Faculty Shared Drive",
          btnText: "Open Drive Repository"
        },
        {
          id: "drive-master-sem1",
          name: "Batch Master Archive Drive (Sem 1)",
          curatorLabel: "Curator",
          curators: "Batch Archive",
          url: "https://drive.google.com/drive/folders/1NDn8uOtrcdISW99hR9mB4y9yGxVve0uV",
          badge: "Archive Drive",
          btnText: "Open Drive Repository"
        }
      ]
    },

    {
      categoryId: "syllabi",
      categoryTitle: "Official Course Syllabi & Verified Readings",
      categoryDesc: "Complete official department syllabus text & verified drive reading links.",
      items: [
        {
          id: "syllabus-card-101",
          paperCode: "PS-CC 101",
          name: "PS-CC 101: Key Texts in Political Philosophy",
          curatorLabel: "Official Syllabus",
          curators: "Department of Political Science, DU",
          badge: "Official Verified Syllabus",
          isSyllabusText: true
        },
        {
          id: "syllabus-card-102",
          paperCode: "PS-CC 102",
          name: "PS-CC 102: Democracy & Political Institutions in India",
          curatorLabel: "Official Syllabus",
          curators: "Department of Political Science, DU",
          badge: "Official Verified Syllabus",
          isSyllabusText: true
        },
        {
          id: "syllabus-card-103",
          paperCode: "PS-CC 103",
          name: "PS-CC 103: Theories of International Relations",
          curatorLabel: "Official Syllabus",
          curators: "Department of Political Science, DU",
          badge: "Official Verified Syllabus",
          isSyllabusText: true
        }
      ]
    },

    {
      categoryId: "portals",
      categoryTitle: "Official Portals & Community Groups",
      categoryDesc: "Official DU department portal and batch discussion groups.",
      items: [
        {
          id: "link-dept-website",
          name: "Department of Political Science, DU",
          curatorLabel: "Official Portal",
          curators: "University of Delhi",
          url: "https://polscience.du.ac.in/",
          badge: "Official Website",
          btnText: "Visit Department Website"
        },
        {
          id: "link-unfiltered-wa",
          name: "North & South Campus Unfiltered Chat",
          curatorLabel: "Community Group",
          curators: "North & South Campus Batch",
          url: "https://chat.whatsapp.com/KZ9uTlm2BYULtVyTEQ7tNQ?mode=gi_t",
          badge: "WhatsApp Group",
          btnText: "Join WhatsApp Group"
        }
      ]
    }
  ],

  // ---------------------------------------------------------------------------
  // DIRECTORY & OFFICIAL ALLOCATIONS (BY PAPER)
  // ---------------------------------------------------------------------------
  directory: {
    curator: {
      name: "Me",
      role: "Batman",
      phone: "+91 95880 55573",
      cleanPhone: "919588055573",
      waUrl: "https://wa.me/919588055573?text=Hi%20Anshul,%20regarding%20the%20MA%20Pol%20Sci%20assessments/readings:",
      note: "If there are any errors or latest updates, please DM me on WhatsApp."
    },
    crs: [
      { name: "Drishti Falwaria", phone: "+91 92057 09965", cleanPhone: "919205709965", role: "Class Representative" },
      { name: "Shruti Gupta", phone: "+91 80518 84973", cleanPhone: "918051884973", role: "Class Representative" },
      { name: "Sujal Vishwakarma", phone: "+91 96965 33151", cleanPhone: "919696533151", role: "Class Representative" }
    ],
    crEtiquette: "Kindly do not call during class hours. Kindly be respectful and avoid personal messages after 8:30 PM.",

    // Core Compulsory Courses (Room 18, Satyakam Bhawan)
    corePapers: [
      {
        code: "PS-CC 101",
        title: "Key Texts in Political Philosophy",
        venue: "Room No. 18, Satyakam Bhawan",
        facultyList: [
          { name: "Prof. Ashok Acharya", topic: "Plato's Republic (Books I-V)", status: "Completed 25 Sept Cycle" },
          { name: "Dr. Miranda Das", topic: "Simone de Beauvoir's The Second Sex", status: "Completed 25 Sept Cycle" },
          { name: "Dr. Ningthoujam Koiremba Singh", topic: "Unit I (Theories of Interpretation) & Unit III (Rousseau: Social Contract)", status: "Active Assessment on 9 Oct (40M)" },
          { name: "Dr. Saroj Giri", topic: "Not taught yet", status: "Department Faculty" },
          { name: "Dr. Rajesh Dev", topic: "Not taught yet", status: "Department Faculty" }
        ]
      },
      {
        code: "PS-CC 102",
        title: "Democracy and Political Institutions in India",
        venue: "Room No. 18, Satyakam Bhawan",
        facultyList: [
          { name: "Prof. Ujjwal Kumar Singh", topic: "Unit I (Ancient Constitutionalism, Freedoms, Emergency) & Unit IV (Rule of Law & Decolonization of Laws)", status: "Active Assessment on 9 Oct (20M)" },
          { name: "Dr. Garima Das", topic: "Unit II: Judiciary", status: "Unit II Excluded from 9 Oct CA" },
          { name: "Dr. Binit K. Sinha", topic: "Unit II: Executive", status: "Unit II Excluded from 9 Oct CA" },
          { name: "Prof. Rekha Saxena", topic: "Not taught yet", status: "Department Faculty" },
          { name: "Prof. Nasreen Chowdhory", topic: "Not taught yet", status: "Department Faculty" },
          { name: "Dr. Sitaram Kumbhkar", topic: "Not taught yet", status: "Department Faculty" }
        ]
      },
      {
        code: "PS-CC 103",
        title: "Theories of International Relations",
        venue: "Room No. 18, Satyakam Bhawan",
        facultyList: [
          { name: "Prof. Navnita C. Behera", topic: "Unit I-a: The Eurocentric Origin of the Discipline", status: "Taught Unit I-a (Readings on Drive)" },
          { name: "Dr. Megha", topic: "Unit I-b (Births of the Discipline) & Unit III-b (Feminism)", status: "Completed CA-1" },
          { name: "Dr. Surae Soren", topic: "Unit II-a: Realism", status: "Completed CA-1" },
          { name: "Prof. Bipin Tiwary", topic: "Unit II-b: Liberalism", status: "Completed CA-1" },
          { name: "Dr. Robert Mizo", topic: "Unit II-c: Marxism, Neo-Marxism & Unit III-a: Constructivism", status: "Readings on Drive" },
          { name: "Prof. Sanjeev Kumar HM", topic: "Not taught yet", status: "Department Faculty" },
          { name: "Dr. Mithila Bagai", topic: "Not taught in CC-103 yet (Teaches DSE)", status: "Department Faculty" }
        ]
      }
    ],

    // Skill-Based Course (SBC)
    sbcCourse: {
      code: "PS-SBC 01",
      title: "Elections and Data-Driven Electoral Analysis",
      faculty: [
        "Dr. Sudhir Singh",
        "Dr. Sitaram Kumbhakar",
        "Dr. Anjali Yogi",
        "Dr. Shivam Choudhary"
      ]
    },

    // Discipline Specific Electives (Optional Courses)
    dseGroups: [
      {
        groupName: "Group 1 (Optional Courses)",
        courses: [
          {
            code: "PS-DSE 25",
            title: "Key Concepts in Indian Political Thought",
            faculty: "Dr. Smita Agarwal & Dr. Radha Kumari"
          },
          {
            code: "PS-DSE 13",
            title: "International Relations of South Asia",
            faculty: "Dr. Ningthoujam Koiremba Singh & Dr. Abhishek Choudhary"
          },
          {
            code: "PS-DSE 47",
            title: "Introduction to Political Philosophy",
            faculty: "Prof. Ashok Acharya, Dr. Rajesh Dev & Dr. Miranda Das"
          }
        ]
      },
      {
        groupName: "Group 2 (Optional Courses)",
        courses: [
          {
            code: "PS-DSE 06",
            title: "Comparative Political Theory",
            faculty: "Dr. Mithila Bagai & Dr. Anjali Yogi"
          },
          {
            code: "PS-DSE 16",
            title: "United States of America in the Transforming Global Order",
            faculty: "Dr. Nistha Kaushik & Dr. Shivam Chaudhary"
          },
          {
            code: "PS-DSE 35",
            title: "International Political Economy",
            faculty: "Dr. Sudhir Singh"
          }
        ]
      }
    ]
  }};