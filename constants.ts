import { Project, Experience, SocialLink } from './types';

export const OWNER_NAME = "SIYEON JEON";
export const OWNER_ROLE = "Product Manager with Design & Data Literacy";
export const OWNER_BIO = "A product maker who enjoys facing problems and feels a sense of accomplishment in the process of solving them.";
export const PROFILE_IMAGE = "/images/profile.jpg";

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: "LinkedIn", url: "https://www.linkedin.com/in/siyeon-jeon/?locale=en_US", icon: "linkedin" },
  { platform: "Email", url: "mailto:seeyeon.jeon@gmail.com", icon: "email" },
];

/**
 * PROJECTS ARRAY
 * - To add a project: Add a new object to this array.
 * - To change order: Move the objects up or down in this list.
 */
export const PROJECTS: Project[] = [
  {
    id: "er",
    title: "Cluon-ER",
    summary: "AI-based Prediction Solution for Emergency Room",
    description: "Visualizing Complex ER Data into Intuitive 'Alarms' to Secure the Golden Hour",
    overview: "Led the product planning and management of 'Cluon-ER', an AI software designed to predict patient deterioration (Cardiac Arrest, Respiratory Failure) in emergency rooms. Transformed complex EMR data into an intuitive 'Alarm-based Dashboard' to support rapid decision-making in high-pressure environments.",
    content: `

###### As this product is undergoing approval from goverment, it is difficult to disclose the product screen.
## Challenge
#### "Overcrowding, Staff Shortages, and Cognitive Overload"
The emergency room is a high-stakes environment where resources are scarce and time is critical.
* **Staff Shortage:** A 43% decrease in ER doctors within a year led to extreme conditions, such as single-doctor shifts managing multiple critical patients.
* **Subjectivity of Triage:** Existing tools like KTAS (Korean Triage and Acuity Scale) suffer from low inter-rater reliability (<80%), creating a need for an objective **"Second Opinion."**
* **Data Fragmentation:** Clinicians had to manually check fragmented texts and numbers in the EMR, increasing **Cognitive Load** during critical moments.

## Core Value Proposition
#### An Objective 'Second Opinion' for the Blind Spots of Triage
##### Concern:
"Can initial data alone predict prognosis?"
##### Answer:
The "Initial Triage" phase is where resources are scarcest and human error risks are highest.
* **Problem:** Manual triage (KTAS) is subjective and prone to errors during overcrowding.
* **Solution:** Cluon-ER acts as an 'AI Second Opinion', analyzing objective Vital Signs and EMR data to detect deterioration risks within 12 hours. It doesn't replace doctors but **safeguards the Golden Hour** by flagging missed risks.


## Solution
### Strategy 1: UX Shift from 'Screening' to 'Alarm'
#### Hypothesis:
In an unpredictable ER workflow, a static 'Screening List' is insufficient. An **'Alarm-based Dashboard'** that actively notifies clinicians of risks is more effective.
#### Execution:
* **Dashboard UI:** Replaced the legacy list view with a comprehensive dashboard.
* **Visual Alerts:** Designed 'Red Color' card UIs that trigger immediately when prediction scores (e.g., Cardiac Arrest risk) reach critical levels.
* **Alarm Fatigue Management:** Implemented a **'Snooze' function**, allowing staff to temporarily mute known risks to prevent desensitization to alarms.

### Strategy 2: Advanced Filtering Logic for ER Workflows
#### 'View Monitored Patients Only' Filter:
* **Problem:** In some ERs, zone boundaries are ambiguous, or EMR integration for zone data is unavailable, making it difficult for staff to filter patients by their assigned area.
* **Solution:** Developed a **'Monitoring' status filter** that allows staff to manually flag and view specific patients. This serves as a critical workaround for monitoring patients in unsupported zones or focusing on high-priority individuals within an assigned area.
#### Zone Selection & Auto-Reset Logic:
* **Context:** Unlike general wards, ERs are strictly divided into 'Zones' (e.g., Triage, Resuscitation, General).
* **Feature:** Placed a **'Zone Selector'** at the top of the dashboard for quick visibility of assigned patients.
* **Shift Optimization:** Implemented a logic that **resets the Zone Filter to 'Default (All)' upon logout**. This prevents confusion during shift changes, ensuring the next doctor doesn't miss patients due to inherited filter settings from the previous shift.

### Strategy 3: Regulatory Compliance & Security
* **Cybersecurity:** Implemented robust security features (Account Lockout after 5 failures, Auto-logout, Duplicate Login Prevention) in compliance with **MFDS Cybersecurity Guidelines**.
* **Audit Trail:** Developed an Admin Console to log all access and data viewing history, requiring justification for data downloads to strengthen PHI (Protected Health Information) security.

## Achivement
* **Clinically Aligned MVP:** Completed the **Software Requirements/Design Specifications (SRS/SDS)** based on requirements gathered from on-site visits (e.g., Chonnam National Univ. Hwasun Hospital).
* **Alpha Version Success:** Secured positive feedback from internal medical reviews (CAS), confirming that the workflow **"aligns well with actual ER scenarios."**
* **Regulatory Readiness:** Establishing plans for **Usability Engineering (Formative/Summative Evaluation)** and leading the creation of the **Design History File (DHF)** for licensing in H2 2025.
    `,
    role: "Product Management, Product Design, Associate Project Management",
    period: "Jan 2025 — Jan 2026",
    tools: ["Figma", "Jira", "Confluence", "Microsoft Office"],
    domain: ["AI", "Healthcare", "SaMD"],
    tags: ["0 to 1"],
    imageUrl: "/images/er-1.jpg"
  },
  {
    id: "vc",
    title: "VitalCare",
    summary: "Ensuring Continuity of Care: Transitioning from System-Driven to User-Driven Monitoring",
    description: "Patient monitoring dashboard optimization",
    overview: "Redesigned the patient monitoring workflow for 'VitalCare', an AI-based patient deterioration prediction software.",
    content: 
    `
## Challenge
**"When the AI alarm stops, the patient disappears."**   
VitalCare was designed to prioritize patients with active "Risk Alarms." However, this logic created a critical gap in the actual medical workflow.

* **The Phenomenon:** The default "24-hour filter" automatically hid patients whose conditions had stabilized or who hadn't triggered a new alarm recently.
* **The Pain Point (Data-Driven):**
    * Analysis of VoC (Voice of Customer) revealed that **6.07%** of all feature requests were complaints about "vanishing patients" or "unstable lists."
    * In a specialized B2B medical domain, a **~6% active complaint rate** signifies a massive **"Silent Majority"** facing a critical workflow disruption.
* **Verbatim:** *"The patient I was monitoring just vanished."* / *"I only want to see my primary patients."*
* **Core Problem:** It wasn't just a usability issue; it was a **Safety Risk**. Medical staff felt anxiety about losing track of patients who needed "Continuity of Care" (e.g., patients stabilized after medication but requiring ongoing watch).

## Solution
**Shift to a "User-Driven Monitoring System"**
I shifted the paradigm from "Viewing what the AI shows" to "Viewing what the User decides."

### Feature A. Patient Pinning (Top-Fixation)
**"Important patients stay visible, regardless of filters."**
* **Logic:** Designed a 'Pin' feature that overrides all time filters (e.g., 24h filter) and alarm statuses. Pinned patients are fixed to the top of the dashboard, ensuring permanent visibility.
* **Cognitive Load Management:** Limited the maximum number of pinned patients to **10 per account**. This constraint prevents the dashboard from becoming cluttered and forces users to prioritize "truly critical" patients, reducing cognitive fatigue.
* **Familiar Interaction:** Adopted UI patterns from EMR (Electronic Medical Records) systems to minimize the learning curve for medical staff.

### Feature B. Manual Screening
**"Flagging patients even without AI Alarms."**
* **Gap Filling:** Addressed edge cases where AI scores are low but human monitoring is ethically or medically required (e.g., Non-reimbursement consent patients, patients temporarily stable due to drugs).
* **Workflow Integration:** Enabled 'Manual Screening' directly from the patient search modal, allowing instant registration of patients into the monitoring list.

### Micro-UX Improvements
Beyond the core features, I refined the details to enhance operational efficiency.
* **Filter Persistence:** Implemented local/server storage for filter settings. The system now "remembers" the user's last-used time range and sorting options upon re-login, eliminating repetitive setup tasks.
* **Visual Feedback:** Added percentage (%) progress bars to History Reports to manage user expectations during system wait times.
* **Search UX:** Reduced the depth of the patient search flow, allowing immediate actions (Pin/Unpin) directly within the search results.

### Expected Outcome
* **Problem Resolution:** Expecting **100% resolution** of the 22 critical VoC cases related to "patient list instability."
* **Behavior Tracking:** Designed event logs to track the **"Usage Rate"** of the new Pinning feature compared to the legacy 'Bookmark' feature.
* **Future Optimization:** Plan to analyze usage patterns based on hospital size (Tertiary vs. General Hospitals) to further refine the logic post-launch (Q1 2026).

### Takeaways
* **Balancing AI & Human Agency:**
    * Learned that while AI automation is powerful, providing **"Human Overrides"** (Pinning/Manual Screening) is essential for building trust and safety in medical software.
* **Voice of the Silent Majority:**
    * Validated that in B2B products, a small percentage of vocal complaints often represents a fatal flaw in the workflow that affects all users.
    `,
    role: "Product Design, Associate Project Manager",
    period: "Jan 2024 — Jan 2025",
    tools: ["Figma", "Jira", "Confluence", "Microsoft Office"],
    domain: ["AI", "Healthcare", "SaMD"],
    tags: ["Growth"],
    imageUrl: "/images/vc-1.jpg"
  },
  {
    id: "bodab-ai",
    title: "BODAB.AI",
    summary: "Insurance product comparison platform 'BODAB.AI' renewal.",
    description: "99.6% of visitors flow into the core funnel, leading to a 6.95%p conversion increase.",
    overview: "Aimed to diagnose core service problems through data analysis and user research, improving the UX and core business indicators ahead of the official launch.",
    content: `
## Challenge
BODAB.AI had been operating a Beta service with the goal of providing objective insurance comparison without requiring personal information. However, internal data showed that users struggled with understanding complex insurance terms, leading to stagnation in the core funnel conversion rate.

## Process
### Definition of the problem
We analyzed data and user voices to define our roadmap:
1. **Data Insight**: Task success for 'Compare Products' was 97.1%, yet satisfaction was low.
2. **User Insight**: In-depth interviews revealed complex UI layouts.
3. **Market Analysis**: Competitors were moving towards graph-based data visualization.

![Process Diagram Example](/images/bodab-ai-process.jpg)

### Solution
We established three key hypotheses to drive the renewal:

1. **Reduction of Cognitive Overload**: Replacing jargon with easy explanations and separating information stages.
2. **Improving Reliability**: Moving away from internal rankings toward objective data.
3. **Strengthening Discoverability**: Replacing the floating FAB with a fixed bottom CTA.

### Prototype Video Demo
You can embed video demonstrations of your product using the standard image syntax with an .mp4 or .webm file.

![BODAB.AI Demo Video](/videos/bodab-demo.mp4)

## Outcome
* **Service officially opened in Sept 2023.**
* **Accumulated 100,000 uses** within the first 3 months.
* **Satisfaction score tripled**: from 20.6 points to 63.6 points.
* **Conversion rate increased by 6.95%p** (final conversion compared to total visits).
    `,
    role: "Project Management, Product Design",
    period: "Jan 2023 — Aug 2023",
    tools: ["Figma", "MS Office", "Notion"],
    domain: ["AI", "Insur-tech"],
    tags: ["Growth"],
    imageUrl: "/images/bodab-1.jpg"
  },
  {
    id: "haein",
    title: "HAEIN",
    summary: "Heavy Equipment Integrated Management App/Web",
    description: "Internal infrastructure to reduce external system dependency.",
    overview: "A project to build a heavy equipment integrated management service provided by Hyein, the domestic dealer for CATERPILLAR.",
    content: `
## Challenge
**"High Costs and Low Flexibility of External Solutions"**
The company relied on a third-party subscription service for managing heavy equipment assets. However, this incurred high monthly fixed costs and failed to support the specific, complex workflows of our dealership business.

* **Problem:** The generic external tool could not accommodate our specific data structure, leading to manual workarounds and data fragmentation.
* **Goal:** Build an in-house SaaS solution to regain data sovereignty, cut costs, and automate manual processes.

## Solution
### A. Managing Complex Stakeholder Needs
**Insight:**
I identified that even for the same product, the "Definition of Value" differed drastically across user groups:
* **Equipment Owners:** Focus on **Total Operational Efficiency** (ROI, overall fleet status).
* **Operators/Drivers:** Focus on **Immediate Metrics** (Fuel levels, real-time location, emergency contacts for malfunctions).
* **Internal Staff (Sales/Admin):** Focus on **Contract Management** and customer history.

**Strategy:**
* **Role-Based Dashboard:** Designed distinct dashboard interfaces for each user role, prioritizing the specific data points relevant to their goals (e.g., Fleet View for Owners vs. Status Monitor for Operators).
* **User-Centric IA:** Restructured the Information Architecture (IA) to minimize friction for field operators while providing deep data access for managers.

### B. Bridging the Gap Between Client Needs & Technical Feasibility
**Problem:**
The client requested a feature to "view multiple equipment at once on the map," but displaying hundreds of markers simultaneously caused UI clutter and performance issues.

**Action (Technical Collaboration):**
* **API Analysis:** proactively analyzed the **Kakao Map API documentation** to find a feasible solution.
* **Clusterer Implementation:** Proposed using the **'Clusterer'** function (grouping nearby markers) found in the API docs.
* **Developer Collaboration:** Communicated with the development team using technical references, enabling the successful implementation of the grouping feature. This experience significantly improved my ability to understand engineering constraints and communicate effectively with developers.

## Outcome
The project successfully centralized data and reduced operational overhead by a significant margin.
* **Cost Efficiency:** Completely eliminated the monthly licensing fees for the external service, resulting in a permanent reduction in operational costs.
* **Process Automation:** Automated the previously manual contract and maintenance logging processes, reducing administrative work hours.
* **Enhanced Usability:** Delivered a tailored UX that satisfied the distinct needs of 5+ different user personas, from field workers to executives.

## Takeaways
* **Stakeholder Alignment:** Learned how to balance and satisfy conflicting needs from multiple user groups within a single platform.
* **Technical Fluency:** Gained confidence in reading technical documentation (APIs) to bridge the gap between business requirements and engineering implementation.
    `,
    role: "Project Management, Product Design, QA",
    period: "Oct 2019 — Apr 2020",
    tools: ["Figma", "Draw.io", "Notion", "MS Office", "Trello"],
    domain: ["Construction"],
    tags: ["0 to 1"],
    imageUrl: "/images/haein-1.jpg"
  },
  {
    id: "farm-labs",
    title: "Farm Labs 3.0",
    summary: "2x Growth in Installations via UX-Centric Renewal & System Integration.",
    description: "Hardware synchronization UX renewal for smart agriculture monitoring.",
    overview: "Led the comprehensive upgrade of a smart farm solution from a simple monitoring tool (v2.0) to an All-in-One Integrated Farm Management System (v3.0). The renewal focused on mobile accessibility and advanced automation logic, resulting in rapid market adoption.",
    content: `
### Problem
Farmers found the initial setup process for IoT sensors too technical. Complex networking steps led to high return rates and low long-term engagement.

### Process
Redesigned the mobile app pairing flow using **Bluetooth Low Energy (BLE)**. We introduced:
- **Visual Guidance**: Step-by-step illustrations for physical sensor placement.
- **Progress Feedback**: Real-time sync status to reassure users during technical handshakes.

### Impact
- **Active farm installations doubled** within the first quarter.
- **Customer support tickets dropped by 65%**.
- Improved retention as farmers felt more confident managing their own hardware ecosystem.
    `,
    role: "Project Management, Product Design",
    period: "Feb 2019 — May 2019",
    tools: ["Figma", "MS Office", "Zepin", "Asana", "Notion"],
    domain: ["IoT", "Agriculture"],
    tags: ["Growth"],
    imageUrl: "/images/farm-labs-1.jpg"
  },
  {
    id: "coco",
    title: "COCO Review",
    summary: "Customizable Review Management plugin for E-commerce",
    description: "The product addressed the market gap for affordable customization, leading to immediate organic growth and a significant boost in user engagement.",
    overview: "Developed and launched a Minimum Viable Product (MVP) for an e-commerce review management solution, initiated by a specific request from a single client.",
    content: `
## Discovery
**"Can you make a review widget that actually fits our brand?"**   
While managing an existing service, I received a specific request from a client. They were dissatisfied with existing review solutions in the market (e.g., Cafe24 apps) because they were either:
1.  **Too Expensive:** Enterprise-level features that small merchants couldn't afford.
2.  **Too Rigid:** Fixed designs that clashed with the merchant's unique brand identity.

* **The Insight:** I hypothesized that this wasn't just one client's problem, but a broader **unmet need in the SMB (Small and Medium Business) market** for a "Lite, Customizable, and Affordable" review tool.

## Solution
**Goal: Validating the Market with Speed**
Instead of building a heavy full-featured platform, I focused on a lightweight MVP that solved the core pain point: **Design Flexibility**.

* **Customizable Widgets:** Developed a review widget that allows merchants to easily adjust colors, fonts, and layouts to match their brand tone & manner.
* **Photo-First UX:** Designed a UI that prioritizes photo reviews to maximize visual appeal and conversion for fashion/lifestyle merchants.
* **Seamless Installation:** Simplified the installation process (script insertion) to lower the entry barrier for non-technical shop owners.

## Outcome
**Validation of Product-Market Fit**
The MVP proved that the hypothesis—"Merchants want affordable customization"—was correct.

* **Immediate Traction:**
    * Within just **7 days** of release, we received installation inquiries and secured new customers purely through word-of-mouth and the app store listing, with **zero external marketing spend**.
* **Performance Boost:**
    * The pilot merchant (Company T) experienced a **160% increase** in their daily review submission rate after adopting our solution.

## Takeaways
* **The Power of Listening:**
    * Learned that a single, deep conversation with a customer can reveal significant market opportunities that broad data might miss.
* **Lean Execution:**
    * Validated the "Lean Startup" methodology by quickly building an MVP to test the market, rather than over-engineering a perfect product from the start.
    `,
    role: "Project Management, Product Design",
    period: "Apr 2020 — Aug 2020",
    tools: ["Figma", "MS Office", "Notion"],
    domain: ["Commerce", "B2B"],
    tags: ["0 to 1"],
    imageUrl: "/images/coco-1.jpg"
  },
];

export const EXPERIENCE: Experience[] = [
  { id: "1", role: "Service Planning Manager", company: "AITRICS Co.,Ltd.", period: "Sep. 2024 — Current", description: "" },
  { id: "2", role: "Project Manager & Team Leader of Product Design", company: "Welgram Inc.", period: "Apr. 2021 — Dec. 2023", description: "" },
  { id: "3", role: "Project Manager & Service Planning Manager", company: "GiftSmart Inc.", period: "Sep. 2020 — Mar. 2021", description: "" },
  { id: "4", role: "Team Leader of Service Design", company: "Linco Inc.", period: "Jan. 2019 — Aug. 2020", description: "" }
];