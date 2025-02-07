/*
    This file contains all projects data
*/

export const personal_projects= [
    {
        title: "User Data Collection for Python and Node.js",
        description: "Visitor insights tracker",
        image: "/images/ua-project-hero.webp",
        socials: ["Code","Demo"],
        buttonText: "",
        internal:"personal",
        content: [
            "With this program I can automatically track and record visitor location information and device details to provide meaningful analytics. When someone lands on the site, their IP address is retrieved and passed to a geolocation service, which returns details like city, region, and precise coordinates. This data is then stored in a database for analysis, allowing me to understand where visitors are coming from and how their geographic distribution evolves over time. By capturing location details at each visit, I can display region-specific content, as well as gather insights to refine future design and deployment decisions.",
            "In addition to location tracking, the site also parses user agent data to identify browser, operating system, and device type. This process enables me to determine whether a visitor is on a mobile phone, tablet, or desktop computer, and to increment counters that reflect the number of visits from each device category. These analytics help me better tailor the user experience and ensure that my site is accessible and visually optimized across platforms. By combining location services with robust device detection, I demonstrate an understanding of full-stack considerations—from data collection and storage to front-end adaptability."
        ],
        languages: ["Python", "JavaScript"],
        frameworks: ["Django", "Node.js", "Next.js"],
        presentation:{},
        demo: true
    },
    {
        title: "Open Ai Chat-GPT + Robinhood API Interface",
        description: "Stock prediction assistant",    
        image: "/images/rh-project-hero.webp",
        socials: ["Code"],
        buttonText: "",
        internal:"personal",
        content:[
            "This is an ongoing project that is intend to connect ChatGPT’s advanced language and reasoning capabilities to a suite of automated trading functions for both stocks and cryptocurrencies. ChatGPT provides real-time analysis on market conditions or price predictions and, through function calling, programmatically triggers buy, sell, or limit order functions defined in the code. These functions handle everything from checking current market hours to verifying symbol validity, enabling seamless integration of AI-driven decision-making into actual trading workflows. The script also includes logic for generating CSV exports of historical trades, giving clear visibility into past transactions and making it easier to perform post-trade analysis or compliance checks.",
            "Under the hood, a robust structure of Python functions interacts with a trading API to retrieve live asset data, check market hours, and place various types of orders (market, fractional, or limit). Through ChatGPT's function-calling interface, the AI can dynamically choose the best function—e.g., “buyFractionalIfOpen” or “sellShareAtMarketOpen”—based on its real-time market evaluation or strategy. By combining natural language insights from ChatGPT with scripted market actions, this project showcases how AI can move beyond passive analysis into direct execution, creating a closed feedback loop between market intelligence and automated trades."
        ],
        languages:["Python"],
        frameworks:["Django", "Flask", "Serverless"],
        presentation:{},
        demo:false
    },
    {
        title: "NPM React-Unused-Image-Finder",
        description: "Image asset manager",
        image: "/images/npm-project-hero.png",
        socials: ["Code","Demo", "NPM"],
        buttonText: "",
        internal:"personal",
        content:[
            "This NPM package streamlines asset management in React applications by detecting and reporting unused images. It scans JavaScript, JSX, TypeScript, and TSX files, parsing import statements via a regular expression to create a catalog of images actually in use. In parallel, it recursively searches common asset directories (e.g., src/images, src/assets, etc.) for all PNG, JPG, JPEG, GIF, and SVG files. By comparing these two lists, the tool quickly identifies which images are unreferenced and provides a concise summary or comprehensive report of both used and unused images. With commands like find-unused-images and find-unused-images-full, developers can integrate this script into their workflow to keep projects organized, reduce clutter, and optimize overall application performance.",
            "After peaking at 273 weekly downloads, I noticed there is wasn't any packages where image files could be manage without interrupting the codebase of the project, therefore making my project one of a kind. The script’s utility extends beyond simply listing unused images; it offers room for enhancements, such as automatically relocating them to a separate folder or prompting developers to remove them via the terminal. By integrating the results into continuous integration pipelines or manual cleanup processes, teams maintain a healthier codebase. This tool highlights the importance of proactive file management, ultimately saving time and bandwidth and reinforcing best practices in front-end development."
        ],
        languages:[],
        frameworks:[],
        presentation:{},
        demo:false
    },
]

export const hackathon_projects = [
    {
        title: "Seratonics",
        description: "SeaHack 2022 @ Amazon",
        image: "/images/hacksea-hero.JPG",
        socials: ["Watch the pitch"],
        buttonText: "",
        internal:"hackathon",
        content:[
            "This hackathon project, called Serotonics, addresses the growing mental health needs of students by breaking down barriers to online counseling and emotional support. Our streamlined web app offers a welcoming user experience through soft, calming color palettes and intuitive graphics, designed to promote comfort and stability for children, parents, and educators alike. Key features include SEL (Social Emotional Learning) activities and games, mental health progress tracking, community event listings, and direct access to counseling services—all built around a simple, minimalist interface. Through these services, educators can monitor each student’s well-being, parents can track their child’s emotional progress, and students themselves can engage with therapeutic resources in a safe, supportive environment.",
            "To sustain and grow the platform, we propose an annual school-year subscription model, supported by ad placement, parent and community donations, and partnerships with mental health providers. Over time, our goal is to expand to additional schools, serve larger communities, and potentially establish our own in-house counseling team—thereby minimizing the reliance on external services. By focusing on ease of access, positive design principles, and collaborative features, Serotonics aims to remove the stigma and logistical hurdles often associated with seeking help, ensuring that young people receive timely, personalized support for their emotional, psychological, and social needs."
        ],
        languages:[],
        frameworks:[],
        presentation:{},
        demo:false
    },
    {
        title: "VC Connection",
        description: "AI Hackathon 2.0 @ Leaner Startups",
        image: "/images/ai_hack_2_hero.jpg",
        socials: ["Watch the demo"],
        buttonText: "",
        internal:"hackathon",
        content:[
            "VCScout is an AI-powered platform designed to bridge the gap between startups and vital resources for growth. By analyzing business ideas and pitches, the platform intelligently connects early-stage companies with investors, incubators, accelerators, and other support networks. This focus on accessibility and inclusivity is reinforced by affordable subscription models, providing startups with a comprehensive array of services—including office space, government grants, accelerator programs, and digital marketing tools. Through strategic partnerships with universities, existing entrepreneurial organizations, and referral programs, VCScout aims to foster a supportive and collaborative environment that helps startups succeed in the competitive tech and innovation ecosystem.",
            "Central to VCScout’s value proposition is its smart matching system. Leveraging AI algorithms, the platform identifies promising ventures and pairs them with curated resources, unlocking targeted opportunities for investment, mentorship, and market exposure. In addition to subscription revenue, VCScout plans to fund further development through VC fees, success from funded startups, and ad placements. This balanced approach to growth supports a robust vision for economic impact—helping new businesses thrive while driving innovation and job creation. Through ongoing enhancements, including improved AI matching, extended partnerships, and scalable digital outreach, VCScout aspires to become an integral part of the global startup landscape."
        ],
        languages:[],
        frameworks:[],
        presentation:{},
        demo:false
    },
    {
        title: "Learning 4 You",
        description: "AI Hackathon 3.0 @ Leaner Startups",
        image: "/images/ai_hack_3_hero.JPG",
        socials: ["Watch Semi-finals Q&A"],
        buttonText: "",
        internal:"hackathon",
        content:[
            "Learning 4 You is an AI-powered tutoring solution that integrates seamlessly with existing on-demand course platforms to deliver personalized, on-demand feedback and targeted study tools for self-paced learners. By assessing a student’s baseline understanding and adaptively guiding them through complex concepts, this software aims to replicate the individualized attention of a classroom teacher. Learners can ask for immediate feedback, receive custom problem sets, and uncover detailed explanations on why certain mistakes occurred. These features address key gaps in current e-learning experiences by helping students grasp the “why” behind each lesson, leading to deeper, more durable comprehension.",
            "In terms of business, Learning 4 You plans to license its AI technology to e-learning providers, forging strategic partnerships and premium offerings that cater to the rapidly growing online education market—estimated to reach USD 602 billion by 2030. By tapping into just 1% of this market, the platform stands to realize significant revenue through subscription models, curriculum customization, and premium support services. Early efforts focus on testing the intelligent tutoring system and forming partnerships with major course providers, with expansions and additional funding rounds slated to accelerate growth in subsequent years. Ultimately, Learning 4 You aims to improve learning outcomes, reduce barriers to education, and add tangible value to both learners and educational platforms alike."
        ],
        languages:[],
        frameworks:[],
        presentation:{},
        demo:false
    },
]  

export const side_projects = [
    {
        title: "3D Planets with moons and stars",
        description: "Built infinite stars patterns",
        image: "/images/hacksea-hero.JPG",
        socials: [""],
        buttonText: "",
        internal:"side-3js",
        content:[
            "Infinite Stars is a personal weekend project that experiments with endlessly varying star patterns. Each page refresh or screen resize triggers a new layout of stars—every one unique in position and size, creating an experience that appears infinitely diverse. This approach relies on random number generation and mathematical logic, reflecting concepts often employed in AI and generative art. Alongside the starfield, a Three.js scene showcases a rotating planet orbited by small moons, each textured differently to add another layer of variability. By combining these elements, the project demonstrates how subtle changes in code and calculations can introduce perpetual novelty and provide an engaging, hands-on way to explore advanced math and 3D rendering techniques."
        ],
        languages:["JavaScript"],
        frameworks:["React", "Three.js", "Node.js"],
        presentation:{},
        demo: true
    },
    {
        title: "My First App",
        description: "Calculator with a terminal interface",
        image: "/images/side-project-first-app.jpg",
        socials: ["Watch the pitch"],
        buttonText: "",
        internal:"side",
        content:[
            "Calculator App was my very first software project, created long before I learned best practices for structuring and debugging Python code. Despite the unrefined code and excessive reliance on global variables, I keep it to remind myself of that initial moment when I ventured beyond the classroom into hands-on development.",
            "This script offers a primitive command-line interface where users can add numbers, continue adding to a global sum, and reset that sum. The entire logic rests in a single class and excessive recursion, which is not advisable in production. Additionally, the use of global variables introduces potential conflicts, and there is no clear separation of concerns among input handling, calculation, and output. Nonetheless, Calculator App holds a personal significance as the project that ignited my curiosity about software development and began my journey toward continuous learning and improvement."
        ],
        languages:["Python"],
        frameworks:[],
        presentation:{},
        demo:false
    } 
]