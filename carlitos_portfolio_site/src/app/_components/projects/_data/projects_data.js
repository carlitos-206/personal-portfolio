/*
    This file contains all projects data
*/


export const personal_projects= [
    
    
    {
        title: "User Data Collection: Python + JS",
        description: "Visitor insights tracker",
        image: "/images/ua-project-hero.webp",
        socials: ["Code: JS","Code: Python", "Demo"],
        links:{
            code_js:"https://github.com/carlitos-206/personal-portfolio/blob/main/carlitos_portfolio_site/src/app/_components/projects/_data/legacy/index.js",
            code_py:"https://github.com/carlitos-206/useragent-Django2.2",
            demo: true
        },
        buttonText: "",
        internal:"personal",
        content: [
            "This program automatically tracks visitor location data—city, region, and precise coordinates—by retrieving their IP address and passing it to a geolocation service, then storing the results in a database for ongoing analysis. It also parses user agent information to identify browser, operating system, and device type, enabling me to count visits by device category. By combining geolocation with robust device detection, the system supports region-specific content, provides insights for refining design and deployment strategies, and ensures an optimal user experience across platforms."
        ],
        languages: ["Python", "JavaScript"],
        frameworks: ["Django", "Node.js", "Next.js"],
        presentation:[],
        demo: true,
        global_position: 1
    },


    {
        title: "Chat-GPT + Robinhood API",
        description: "Stock prediction assistant",    
        image: "/images/rh-project-hero.webp",
        socials: ["Code"],
        links:{
            code:"https://github.com/carlitos-206/robinhood_interface",
        },
        buttonText: "",
        internal:"personal",
        content:[
            "This is a ongoing project that integrates ChatGPT's advanced language and reasoning capabilities with a suite of automated trading functions for stocks and cryptocurrencies, allowing the AI to deliver real-time market analysis and trigger programmatic buy, sell, or limit order functions. By leveraging function calling, ChatGPT dynamically selects the appropriate trading action—such as “buyFractionalIfOpen” or “sellShareAtMarketOpen”—based on live market evaluations, while a robust set of Python functions interacts with a trading API to retrieve asset data, check market hours, and verify symbol validity. The system also generates CSV exports of historical trades for post-trade analysis and compliance, effectively creating a closed feedback loop between market intelligence and automated trading workflows."
        ],
        languages:["Python"],
        frameworks:["Django", "Flask", "Serverless"],
        presentation:[],
        demo:false,
        global_position: 2
    },
    
    
    {
        title: "React-Unused-Image-Finder",
        description: "Image asset manager",
        image: "/images/npm-project-hero.png",
        socials: ["Code", "NPM"],
        links:{
            code:"https://github.com/carlitos-206/react-unused-image-finder",
            npm:"https://www.npmjs.com/package/react-unused-image-finder?activeTab=readme"
        },
        buttonText: "",
        internal:"personal",
        content:[
            "This is a published NPM package that streamlines asset management in React applications by detecting and reporting unused images: it scans JavaScript, JSX, TypeScript, and TSX files to catalog images in use via parsed import statements and concurrently searches common asset directories for PNG, JPG, JPEG, GIF, and SVG files, then compares the two lists to quickly identify unreferenced images and generate concise or comprehensive reports. Noticing a gap in the market after peaking at 273 weekly downloads, the project offers a unique, non-intrusive solution for image file management and can be enhanced to automatically relocate or prompt deletion of unused files, making it easy to integrate into continuous integration pipelines or manual cleanup processes—ultimately keeping projects organized, reducing clutter, optimizing performance, and reinforcing front-end best practices."
        ],
        languages:["JavaScript"],
        frameworks:["Node.js"],
        presentation:[],
        demo:false,
        global_position: 3
    },
]

export const hackathon_projects = [
    {
        title: "Seratonics",
        description: "SeaHack 2022 @ Amazon",
        image: "/images/hacksea-hero.JPG",
        socials: ["Watch the pitch"],
        links:{
            video:"https://www.youtube.com/watch?v=q53_2pND2ss&t=6s",
        },
        buttonText: "",
        internal:"hackathon",
        content:[
            "During SeaHack 2022 @ Amazon, we developed Serotonics to address student mental health by breaking down barriers to online counseling and emotional support, building a streamlined web app with a calming, minimalist design that offered SEL (Social Emotional Learning) activities, and games, mental health tracking, community event listings, and direct access to counseling services so that educators, parents, and students could safely monitor and engage with well-being resources. To sustain and grow the platform, we proposed an annual school-year subscription model supported by ads, donations, and partnerships with mental health providers, with plans to expand to additional schools and eventually develop an in-house counseling team, ultimately aiming to remove the stigma and logistical hurdles often associated with seeking help while ensuring young people received timely, personalized support for their emotional, psychological, and social needs."
        ],
        languages:[],
        frameworks:[],
        presentation:[],
        demo:false,
        global_position: 4
    },
    {
        title: "VC Connection",
        description: "AI Hackathon 2.0 @ Leaner Startups",
        image: "/images/ai_hack_2_hero.jpg",
        socials: ["Watch the demo"],
        links:{
            video:"https://www.youtube.com/watch?v=MKpN-xG6Uv0",
        },
        buttonText: "",
        internal:"hackathon",
        content:[
            "During the AI Hackathon 2.0 @ Leaner Startups, we developed VC Scout as an AI-powered platform that bridged the gap between startups and vital growth resources. We built it to analyze business ideas and pitches, intelligently connecting early-stage companies with investors, incubators, accelerators, and other support networks through affordable subscription models that provide services like office space, government grants, accelerator programs, and digital marketing tools. By forming strategic partnerships with universities, entrepreneurial organizations, and referral programs, I fostered a collaborative environment for startups in the competitive tech ecosystem. Central to VCScout was a smart matching system that leveraged AI to pair promising ventures with curated resources, unlocking opportunities for investment, mentorship, and market exposure, while additional revenue streams from VC fees, success fees, and ad placements fueled further development and economic impact."
        ],
        languages:[],
        frameworks:[],
        presentation:[],
        demo:false,
        global_position: 5
    },
    {
        title: "Learning 4 You",
        description: "AI Hackathon 3.0 @ Leaner Startups",
        image: "/images/ai_hack_3_hero.JPG",
        socials: ["Watch us at the semi-finals Q&A"],
        links:{
            video:"https://www.youtube.com/watch?v=0ZM2fdbQb7w&t=197s",
        },
        buttonText: "",
        internal:"hackathon",
        content:[
            "Learning 4 You, was an AI-powered tutoring solution that integrated with on-demand course platforms to provide personalized feedback and targeted study tools for self-paced learners by assessing baseline understanding and adaptively guiding them through complex concepts, much like individualized classroom attention. The platform enabled learners to receive immediate feedback, custom problem sets, and detailed explanations for mistakes, helping them grasp the underlying 'why' behind each lesson for deeper, more durable comprehension. On the business front, Learning 4 You, planned to license its technology to e-learning providers and forge strategic partnerships in the rapidly expanding online education market—projected to reach USD 602 billion by 2030—with the aim of capturing even 1% of this market through subscription models, curriculum customization, and premium support services. Early initiatives focused on testing the intelligent tutoring system and partnering with major course providers, with further expansions and funding rounds planned to accelerate growth, ultimately improving learning outcomes, reducing educational barriers, and adding significant value to both learners and educational platforms."
        ],
        languages:[],
        frameworks:[],
        presentation:[],
        demo:false,
        global_position: 6
    },
]  

export const side_projects = [
    {
        title: "Infinite Stars",
        description: "Built infinite stars patterns",
        image: "/images/hacksea-hero.JPG",
        socials: ["Code"],
        links:{
            code:"https://github.com/carlitos-206/personal-portfolio/blob/main/carlitos_portfolio_site/src/app/_components/projects/_three_js_planet/stars/page.jsx",
        },
        buttonText: "",
        internal:"side-3js",
        content:[
            "Infinite Stars is a personal weekend project that experiments with endlessly varying star patterns. Each page refresh or screen resize triggers a new layout of stars—every one unique in position and size, creating an experience that appears infinitely diverse. This approach relies on random number generation and mathematical logic, reflecting concepts often employed in AI and generative art. Alongside the starfield, a Three.js scene showcases a rotating planet orbited by small moons, each textured differently to add another layer of variability. By combining these elements, the project demonstrates how subtle changes in code and calculations can introduce perpetual novelty and provide an engaging, hands-on way to explore advanced math and 3D rendering techniques... Each time you return to here it will be a brand new pattern"
        ],
        languages:["JavaScript"],
        frameworks:["React", "Three.js", "Node.js"],
        presentation:[],
        demo: true,
        global_position: 7
    },
    {
        title: "My First App",
        description: "Calculator with a terminal interface",
        image: "/images/side-project-first-app.jpg",
        socials: ["Code"],
        links:{
            code:"https://github.com/carlitos-206/first-app",
        },
        buttonText: "",
        internal:"side",
        content:[
            "Calculator App was my very first software project, created long before I learned best practices for structuring and debugging Python code, and despite its unrefined code and excessive reliance on global variables, I keep it as a reminder of that initial moment when I ventured beyond the classroom into hands-on development; the script offered a primitive command-line interface where users could add numbers, continue adding to a global sum, and reset that sum, with all the logic contained in a single class and excessive recursion—a practice not advisable in production—while the use of global variables introduced potential conflicts and lacked a clear separation of concerns among input handling, calculation, and output, yet Calculator App held personal significance as the project that ignited my curiosity about software development and began my journey toward continuous learning and improvement."
    ],
        languages:["Python"],
        frameworks:[],
        presentation:[],
        demo:false,
        global_position: 8
    } 
]