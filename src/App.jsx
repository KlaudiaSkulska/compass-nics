import { useState, useEffect, useRef } from "react";

const NICS_LOGO = "data:image/png;base64,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";

const C = {
  blue:"#0C62FB", dark:"#002FAF", navy:"#0D1B3E", cyan:"#1BE1F2",
  coral:"#FF4D5F", offWhite:"#F7F8FC", lightGray:"#E8EDF5",
  midGray:"#8492A6", textDark:"#0F1B3D", green:"#10B981",
  amber:"#F59E0B", msBlue:"#0078D4", msTeams:"#6264A7",
  nicsGreen:"#1B6B4A", nicsTeal:"#1B6B72", purple:"#7C3AED",
  border:"#E2E8F0", cardBg:"#FFFFFF", pageBg:"#F0F2F8",
};

const DEPARTMENTS = [
  { id:"teo",  short:"TEO",  name:"The Executive Office", color:"#1B4F72",
    desc:"Supports the First Minister and deputy First Minister, managing the overall running of the Executive." },
  { id:"daera",short:"DAERA",name:"Agriculture, Environment & Rural Affairs", color:C.nicsGreen,
    desc:"Focuses on agri-food, environmental, fishing, and forestry sectors." },
  { id:"dfc",  short:"DfC",  name:"Department for Communities", color:C.blue,
    desc:"Manages social security, housing, regeneration, and culture." },
  { id:"dfe",  short:"DfE",  name:"Department for the Economy", color:C.purple,
    desc:"Responsible for economic policy, tourism, energy, and skills training." },
  { id:"de",   short:"DE",   name:"Department of Education", color:"#D97706",
    desc:"Handles school-level education, youth services, and pre-school provision." },
  { id:"dof",  short:"DoF",  name:"Department of Finance", color:"#1A5276",
    desc:"Manages public finances, personnel, and procurement." },
  { id:"doh",  short:"DoH",  name:"Department of Health", color:"#9B2335",
    desc:"Responsible for health and social care services." },
  { id:"dfi",  short:"DfI",  name:"Department for Infrastructure", color:"#4A235A",
    desc:"Covers planning, roads, water, and transport." },
  { id:"doj",  short:"DoJ",  name:"Department of Justice", color:"#1B2631",
    desc:"Manages the justice system, policing, and prisons." },
];

const ROLE_TYPES = [
  { id:"policy",    label:"Policy Officer",                   icon:"📝",
    desc:"Policy development, research, ministerial submissions, AQW responses" },
  { id:"comms",     label:"Communications Officer",            icon:"📣",
    desc:"Press releases, speeches, internal comms, stakeholder briefings" },
  { id:"consult",   label:"Consultation Analyst",              icon:"📊",
    desc:"Survey analysis, consultation reports, stakeholder engagement" },
  { id:"it",        label:"IT & Digital",                      icon:"🖥️",
    desc:"Service desk, data discovery, security monitoring" },
  { id:"finance",   label:"Finance & Procurement",             icon:"£",
    desc:"Business cases, spending analysis, procurement guidance" },
  { id:"hr",        label:"HR & People",                       icon:"👥",
    desc:"People management, training coordination, workforce planning" },
];

// ─── Per-role day content ─────────────────────────────────────────────────────
const ROLE_CONTENT = {
  policy: {
    name:"Gareth", avatar:"GM", color:C.blue,
    greeting:"Good morning, Gareth",
    tagline:"Policy Officer",
    dashTabs:[
      { id:"today",   label:"Today's Work",   icon:"📋" },
      { id:"meetings",label:"Meetings",        icon:"🤝" },
      { id:"prepare", label:"Help Me Prepare", icon:"✍️" },
      { id:"research",label:"Research",        icon:"🔎" },
    ],
    tasks:[
      { id:1, title:"AQW response due — Q1891 Housing Allocation Policy", time:"17:00", tag:"Urgent", tagColor:C.coral, ms:"Planner", done:false },
      { id:2, title:"Climate Change Adaptation consultation — 1,240 responses", time:"EOD", tag:"Urgent", tagColor:C.coral, ms:"To Do", done:false },
      { id:3, title:"Ministerial submission — Community Planning Act progress", time:"Thu", tag:"This week", tagColor:C.amber, ms:"Planner", done:false },
      { id:4, title:"Policy research — devolved housing frameworks (Scotland, Wales)", time:"Fri", tag:"This week", tagColor:C.amber, ms:"Planner", done:false },
      { id:5, title:"Cross-departmental housing briefing — Teams call", time:"10:00", tag:"Done", tagColor:C.green, ms:"Teams", done:true },
    ],
    meetings:[
      { time:"10:00", title:"Cross-departmental housing briefing", attendees:"6 attendees", ms:"Teams", done:true },
      { time:"14:00", title:"AQW triage — private office", attendees:"3 attendees", ms:"Teams", done:false },
      { time:"15:30", title:"Climate consultation analysis session", attendees:"4 attendees", ms:"Teams", done:false },
    ],
    tools:[
      { id:"aqw",    name:"AQW Response Agent",    icon:"📝", tag:"Priority", tagColor:C.coral, ms:"Copilot Studio",
        desc:"Check whether this question has been raised before. Surface precedent. Draft a response using approved policy content from SharePoint." },
      { id:"civic",  name:"Civic Insight Agent",   icon:"📊", tag:"Active", tagColor:C.green, ms:"M365 Copilot",
        desc:"Identify themes, trends, and minority views from consultation responses. Balanced, audit-ready report." },
      { id:"research",name:"Policy Research Analyst",icon:"🔎", tag:"Popular", tagColor:C.blue, ms:"SharePoint",
        desc:"Research and summarise evidenced examples from other jurisdictions across devolved government frameworks." },
      { id:"brief",  name:"Briefing Note Generator",icon:"📄", tag:"Popular", tagColor:C.blue, ms:"M365 Copilot",
        desc:"Turn raw policy data into structured, minister-ready briefing notes aligned to departmental standards." },
      { id:"bizcase",name:"Business Case Support", icon:"£",  tag:"New", tagColor:C.purple, ms:"M365 Copilot",
        desc:"Draft the Strategic Case including Spending Objectives, Risks and Benefits. Saves up to 8 hours per case." },
      { id:"legis",  name:"Guidance & Legislation", icon:"⚖️", tag:"Live", tagColor:C.green, ms:"SharePoint",
        desc:"Retrieve correct guidance, legislation, and policy documents. Removes navigation complexity." },
    ],
    prepareSuggestions:[
      { label:"Draft an AQW response", id:"aqw" },
      { label:"Analyse consultation responses", id:"civic" },
      { label:"Research policy from other jurisdictions", id:"research" },
      { label:"Prepare a ministerial submission", id:"brief" },
    ],
    copilotIq:{ score:91, level:"Advanced", badge:"Article 4 ✓", trend:"+8 this month",
      saved:"4.2 hrs saved this week · 50% less time on research" },
  },
  comms: {
    name:"Esther", avatar:"EM", color:C.nicsGreen,
    greeting:"Good morning, Esther",
    tagline:"Communications Officer",
    dashTabs:[
      { id:"today",   label:"Today's Work",   icon:"📋" },
      { id:"meetings",label:"Meetings",        icon:"🤝" },
      { id:"prepare", label:"Help Me Prepare", icon:"✍️" },
      { id:"content", label:"Content Tools",   icon:"📣" },
    ],
    tasks:[
      { id:1, title:"Corporate communication — Permanent Secretary staff update", time:"12:00", tag:"Urgent", tagColor:C.coral, ms:"Planner", done:false },
      { id:2, title:"AQW response — water abstraction licensing policy", time:"EOD", tag:"Urgent", tagColor:C.coral, ms:"To Do", done:false },
      { id:3, title:"Speaker notes — monthly environment stakeholder webinar", time:"Thu", tag:"This week", tagColor:C.amber, ms:"To Do", done:false },
      { id:4, title:"Quarterly staff magazine — article review and edit", time:"09:00", tag:"Done", tagColor:C.green, ms:"Teams", done:true },
      { id:5, title:"Background profile — new parliamentary questioner", time:"11:00", tag:"Done", tagColor:C.green, ms:"Planner", done:true },
    ],
    meetings:[
      { time:"09:30", title:"Communications team stand-up", attendees:"7 attendees", ms:"Teams", done:true },
      { time:"11:00", title:"Ministerial briefing prep session", attendees:"3 attendees", ms:"Teams", done:true },
      { time:"14:30", title:"Stakeholder comms review", attendees:"5 attendees", ms:"Teams", done:false },
    ],
    tools:[
      { id:"commsauth", name:"Communications Author Agent", icon:"📣", tag:"Live", tagColor:C.green, ms:"Copilot Studio",
        desc:"Generate internal and external communications based on departmental guidelines. Ensures the right message reaches the intended audience." },
      { id:"aqw2",  name:"AQW Response Agent",     icon:"📝", tag:"Priority", tagColor:C.coral, ms:"Copilot Studio",
        desc:"Check precedent, then draft a response within word limits and first-person ministerial tone." },
      { id:"bgprof",name:"Background Profile Generator", icon:"👤", tag:"Popular", tagColor:C.blue, ms:"M365 Copilot",
        desc:"Create background profiles for individuals submitting parliamentary questions before responding." },
      { id:"speech",name:"Speech & Speaker Notes", icon:"🎤", tag:"Popular", tagColor:C.blue, ms:"M365 Copilot",
        desc:"Transform notes from past speeches and consultations into structured, engaging speaker notes for webinars." },
      { id:"press", name:"Press Release Drafter",  icon:"📰", tag:"Live", tagColor:C.green, ms:"M365 Copilot",
        desc:"Draft press releases, answer assembly inquiries, and create briefings for senior leadership with consistent messaging." },
      { id:"techsum",name:"Technical Paper Summariser",icon:"🔬",tag:"New",tagColor:C.purple,ms:"M365 Copilot",
        desc:"Create accessible summaries of technical or scientific articles for general public and ministerial audiences." },
    ],
    prepareSuggestions:[
      { label:"Draft internal communications", id:"commsauth" },
      { label:"Prepare AQW response", id:"aqw2" },
      { label:"Generate background profile", id:"bgprof" },
      { label:"Prepare speaker notes", id:"speech" },
    ],
    copilotIq:{ score:86, level:"Proficient", badge:"Article 4 ✓", trend:"+9 this month",
      saved:"3.1 hrs saved this week · Comms drafting 60% faster" },
  },
  consult: {
    name:"Niamh", avatar:"NB", color:C.nicsTeal,
    greeting:"Good morning, Niamh",
    tagline:"Consultation Analyst",
    dashTabs:[
      { id:"today",   label:"Today's Work",   icon:"📋" },
      { id:"meetings",label:"Meetings",        icon:"🤝" },
      { id:"prepare", label:"Help Me Prepare", icon:"✍️" },
      { id:"analysis",label:"Analysis Tools",  icon:"📊" },
    ],
    tasks:[
      { id:1, title:"Analyse survey responses — Water Quality consultation, 340 responses", time:"12:00", tag:"Urgent", tagColor:C.coral, ms:"Planner", done:false },
      { id:2, title:"Prepare consultation summary for Minister — biodiversity survey", time:"EOD", tag:"Urgent", tagColor:C.coral, ms:"To Do", done:false },
      { id:3, title:"Define scope — Climate Adaptation public consultation", time:"Thu", tag:"This week", tagColor:C.amber, ms:"Planner", done:false },
      { id:4, title:"Summarise technical paper — water abstraction science", time:"Fri", tag:"This week", tagColor:C.amber, ms:"Planner", done:false },
      { id:5, title:"Prepare speaker notes — consultation team webinar", time:"09:00", tag:"Done", tagColor:C.green, ms:"Teams", done:true },
    ],
    meetings:[
      { time:"09:00", title:"Consultation team webinar prep", attendees:"8 attendees", ms:"Teams", done:true },
      { time:"11:30", title:"Water Quality survey review", attendees:"4 attendees", ms:"Teams", done:false },
      { time:"15:00", title:"Biodiversity report sign-off", attendees:"3 attendees", ms:"Teams", done:false },
    ],
    tools:[
      { id:"civic2",  name:"Civic Insight Agent",       icon:"📊", tag:"Priority", tagColor:C.coral, ms:"M365 Copilot",
        desc:"Evaluate responses by categorising stakeholder group feedback. Identify patterns and outliers. Generate a balanced, audit-ready consultation report." },
      { id:"consrep", name:"Consultation Report Builder",icon:"📋", tag:"Active", tagColor:C.green, ms:"M365 Copilot",
        desc:"Generate both summary and comprehensive consultation reports, delving into specifics of each question and supporting evidence by theme." },
      { id:"techsum2",name:"Technical Paper Summariser", icon:"🔬", tag:"Popular", tagColor:C.blue, ms:"M365 Copilot",
        desc:"Summarise technical or scientific articles in accessible Easy Read format for ministerial and public audiences." },
      { id:"scope",   name:"Consultation Scope Definer", icon:"🎯", tag:"New", tagColor:C.purple, ms:"Copilot Studio",
        desc:"Outline consultation objectives, formulate unbiased questions, and identify target stakeholder groups." },
      { id:"themes",  name:"Theme Extraction Agent",     icon:"🏷️", tag:"Live", tagColor:C.green, ms:"M365 Copilot",
        desc:"Analyse qualitative inputs from documents, submissions, and discussion notes. Identify recurring themes and consensus areas." },
      { id:"aqw3",    name:"AQW Response Agent",         icon:"📝", tag:"Active", tagColor:C.blue, ms:"Copilot Studio",
        desc:"Draft AQW responses drawing on consultation data and previous positions. Check precedent before drafting." },
    ],
    prepareSuggestions:[
      { label:"Analyse consultation responses", id:"civic2" },
      { label:"Build consultation report", id:"consrep" },
      { label:"Extract themes from responses", id:"themes" },
      { label:"Summarise a technical paper", id:"techsum2" },
    ],
    copilotIq:{ score:88, level:"Proficient", badge:"Article 4 ✓", trend:"+11 this month",
      saved:"Consultation cycle time reduced 40%. 8 hrs saved per major report." },
  },
  it: {
    name:"Oisín", avatar:"OI", color:"#4F46E5",
    greeting:"Good morning, Oisín",
    tagline:"IT Service Desk Lead",
    dashTabs:[
      { id:"today",   label:"Today's Work",   icon:"📋" },
      { id:"meetings",label:"Meetings",        icon:"🤝" },
      { id:"prepare", label:"Help Me Prepare", icon:"✍️" },
      { id:"ops",     label:"IT Operations",   icon:"🖥️" },
    ],
    tasks:[
      { id:1, title:"Review 3 escalated IT tickets — VPN and access issues", time:"11:00", tag:"Urgent", tagColor:C.coral, ms:"Planner", done:false },
      { id:2, title:"TRIM/CM data discovery scan — 4 records flagged for review", time:"EOD", tag:"Urgent", tagColor:C.coral, ms:"To Do", done:false },
      { id:3, title:"Monthly IT capacity briefing preparation", time:"14:00", tag:"Today", tagColor:C.blue, ms:"Planner", done:false },
      { id:4, title:"Purview DLP alert review — 2 low-risk items", time:"Thu", tag:"This week", tagColor:C.amber, ms:"Planner", done:false },
      { id:5, title:"Server login security report — auto-generated", time:"09:30", tag:"Done", tagColor:C.green, ms:"SharePoint", done:true },
    ],
    meetings:[
      { time:"09:00", title:"IT team daily stand-up", attendees:"5 attendees", ms:"Teams", done:true },
      { time:"11:00", title:"Escalated ticket review", attendees:"2 attendees", ms:"Teams", done:false },
      { time:"14:00", title:"Monthly capacity briefing", attendees:"6 attendees", ms:"Teams", done:false },
    ],
    tools:[
      { id:"itagent", name:"IT Helpdesk Agent",         icon:"🖥️", tag:"Live", tagColor:C.green, ms:"Agent 365",
        desc:"Agentic assistance for service-related staff inquiries, drawing on the Book of Knowledge to resolve issues without manual triage." },
      { id:"datadisc",name:"Personal Data Discovery",   icon:"🔍", tag:"Compliance", tagColor:C.coral, ms:"Purview",
        desc:"Scans TRIM and CM repositories to detect, classify, and validate personal data against retention rules. Rapid assurance checks." },
      { id:"loginmon",name:"Server Login Monitor",      icon:"🔒", tag:"Automated", tagColor:C.blue, ms:"SharePoint",
        desc:"Consolidates server login records, validates access patterns, identifies anomalies. Transforms a full day's manual work." },
      { id:"ticksum", name:"Ticket Escalation Summariser",icon:"📋",tag:"Active",tagColor:C.green,ms:"M365 Copilot",
        desc:"AI summary of escalated tickets with suggested resolution paths from the Book of Knowledge and priority ranking." },
      { id:"dlp",     name:"Purview DLP Alert Viewer",  icon:"🛡️", tag:"Live", tagColor:C.green, ms:"Purview",
        desc:"Real-time view of Microsoft Purview data loss prevention alerts with guided remediation steps." },
      { id:"itreport",name:"Incident Report Generator", icon:"📊", tag:"New", tagColor:C.purple, ms:"M365 Copilot",
        desc:"Draft IT incident reports from ticket logs with root cause analysis and recommended actions." },
    ],
    prepareSuggestions:[
      { label:"Triage escalated IT tickets", id:"ticksum" },
      { label:"Run data discovery scan", id:"datadisc" },
      { label:"Review DLP alerts", id:"dlp" },
      { label:"Prepare capacity briefing", id:"itagent" },
    ],
    copilotIq:{ score:79, level:"Developing", badge:"Article 4 ✓", trend:"+14 this month",
      saved:"Queue down 34% vs last month. 1,847 tickets resolved autonomously." },
  },
  finance: {
    name:"Phillip", avatar:"PO", color:C.purple,
    greeting:"Good morning, Phillip",
    tagline:"Policy Creation & Business Cases",
    dashTabs:[
      { id:"today",   label:"Today's Work",   icon:"📋" },
      { id:"meetings",label:"Meetings",        icon:"🤝" },
      { id:"prepare", label:"Help Me Prepare", icon:"✍️" },
      { id:"policy",  label:"Policy Tools",    icon:"🏛️" },
    ],
    tasks:[
      { id:1, title:"Programme brief — Agri-Environment Scheme renewal", time:"11:00", tag:"Urgent", tagColor:C.coral, ms:"Planner", done:false },
      { id:2, title:"Business case — Woodland Creation Fund, Strategic Case section", time:"EOD", tag:"Urgent", tagColor:C.coral, ms:"To Do", done:false },
      { id:3, title:"Outline delivery & assurance strategy — rural development", time:"Thu", tag:"This week", tagColor:C.amber, ms:"Planner", done:false },
      { id:4, title:"Stakeholder comms — Farming Support Scheme programme closure", time:"Fri", tag:"This week", tagColor:C.amber, ms:"Planner", done:false },
      { id:5, title:"Policy brainstorming session — Teams", time:"09:30", tag:"Done", tagColor:C.green, ms:"Teams", done:true },
    ],
    meetings:[
      { time:"09:30", title:"Policy creation brainstorm", attendees:"5 attendees", ms:"Teams", done:true },
      { time:"12:00", title:"Business case working group", attendees:"4 attendees", ms:"Teams", done:false },
      { time:"15:00", title:"Programme brief review", attendees:"3 attendees", ms:"Teams", done:false },
    ],
    tools:[
      { id:"bizcase2",name:"Business Case Support Agent", icon:"£", tag:"Priority", tagColor:C.coral, ms:"M365 Copilot",
        desc:"Draft the Strategic Case including Spending Objectives, Risks and Benefits. Saves up to 8 hours per moderate or major case." },
      { id:"progbrief",name:"Programme Brief Drafter",    icon:"📄", tag:"Popular", tagColor:C.blue, ms:"M365 Copilot",
        desc:"Generate a first draft programme brief by pulling key points from the mandate or business case, including costs, scope, and risks." },
      { id:"delivery2",name:"Delivery & Assurance Advisor",icon:"📐",tag:"Active",tagColor:C.green,ms:"Copilot Studio",
        desc:"Suggest delivery approaches based on MSP methodologies and organisation templates. Accelerates communication and funding strategy sections." },
      { id:"audience2",name:"Audience-Targeted Content",  icon:"🎯", tag:"New", tagColor:C.purple, ms:"M365 Copilot",
        desc:"Reformat and rewrite policy content for different audiences — simplifying for non-technical readers or emphasising risks for governance groups." },
      { id:"closure2", name:"Programme Closure Summariser",icon:"✅",tag:"Live",tagColor:C.green,ms:"M365 Copilot",
        desc:"Draft closure narratives including milestones, changes, and outcomes. Surface recurring challenges and timeline-impacting decisions." },
      { id:"research3",name:"Policy Research Analyst",    icon:"🔎", tag:"Popular", tagColor:C.blue, ms:"SharePoint",
        desc:"Research evidenced examples from other jurisdictions. Gather insights across devolved frameworks, external studies, and prior departmental work." },
    ],
    prepareSuggestions:[
      { label:"Draft a programme brief", id:"progbrief" },
      { label:"Prepare a business case", id:"bizcase2" },
      { label:"Outline delivery strategy", id:"delivery2" },
      { label:"Draft stakeholder communications", id:"audience2" },
    ],
    copilotIq:{ score:82, level:"Proficient", badge:"Article 4 ✓", trend:"+6 this month",
      saved:"Business case preparation cut by 8 hours. Programme brief in 20 min vs half a day." },
  },
  hr: {
    name:"Claire", avatar:"CB", color:"#D97706",
    greeting:"Good morning, Claire",
    tagline:"HR & People",
    dashTabs:[
      { id:"today",   label:"Today's Work",   icon:"📋" },
      { id:"meetings",label:"Meetings",        icon:"🤝" },
      { id:"prepare", label:"Help Me Prepare", icon:"✍️" },
      { id:"people",  label:"People Tools",    icon:"👥" },
    ],
    tasks:[
      { id:1, title:"Draft HR policy update — hybrid working framework", time:"15:00", tag:"Urgent", tagColor:C.coral, ms:"Planner", done:false },
      { id:2, title:"Workforce planning report — Q1 headcount analysis", time:"EOD", tag:"Urgent", tagColor:C.coral, ms:"To Do", done:false },
      { id:3, title:"Training coordination — AI literacy programme rollout", time:"Thu", tag:"This week", tagColor:C.amber, ms:"Planner", done:false },
      { id:4, title:"Onboarding pack — 3 new joiners starting Monday", time:"Fri", tag:"This week", tagColor:C.amber, ms:"Planner", done:false },
      { id:5, title:"Team stand-up and weekly check-ins", time:"09:00", tag:"Done", tagColor:C.green, ms:"Teams", done:true },
    ],
    meetings:[
      { time:"09:00", title:"Weekly HR team check-in", attendees:"6 attendees", ms:"Teams", done:true },
      { time:"11:00", title:"AI literacy programme planning", attendees:"4 attendees", ms:"Teams", done:false },
      { time:"14:00", title:"Workforce planning review", attendees:"3 attendees", ms:"Teams", done:false },
    ],
    tools:[
      { id:"hrdraft", name:"Policy Document Drafter",   icon:"📄", tag:"Popular", tagColor:C.blue, ms:"M365 Copilot",
        desc:"Draft HR policy documents, updates, and frameworks aligned to civil service standards and departmental requirements." },
      { id:"ailit4",  name:"AI Literacy Tracker",       icon:"📚", tag:"Required", tagColor:C.coral, ms:"Viva Insights",
        desc:"Track EU AI Act Article 4 literacy completion across the department. Auto-generate progress reports for leadership." },
      { id:"onboard", name:"Onboarding Pack Generator", icon:"👋", tag:"New", tagColor:C.purple, ms:"M365 Copilot",
        desc:"Create comprehensive onboarding packs for new joiners tailored to role and department, drawing on current policies and guides." },
      { id:"workforce",name:"Workforce Planning Tool",  icon:"📊", tag:"Active", tagColor:C.green, ms:"Viva Insights",
        desc:"Analyse headcount data, surface trends, and generate workforce planning reports from Viva Insights telemetry." },
      { id:"training",name:"Training Coordinator",      icon:"🎓", tag:"Live", tagColor:C.green, ms:"Viva Learning",
        desc:"Coordinate AI literacy and Copilot training schedules. Adaptive learning paths based on current proficiency levels." },
      { id:"meetsum", name:"Meeting Summariser",        icon:"🤝", tag:"Live", tagColor:C.green, ms:"Teams",
        desc:"Instant AI recap of any Teams call — action items, decisions, owners. Maintains continuity between meetings." },
    ],
    prepareSuggestions:[
      { label:"Draft an HR policy update", id:"hrdraft" },
      { label:"Check AI literacy progress", id:"ailit4" },
      { label:"Prepare onboarding pack", id:"onboard" },
      { label:"Generate workforce planning report", id:"workforce" },
    ],
    copilotIq:{ score:75, level:"Developing", badge:"Article 4 ✓", trend:"+16 this month",
      saved:"2.8 hrs saved this week. Onboarding pack time cut from 4 hrs to 25 min." },
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function MsBadge({ product, color }) {
  const c = color || C.msBlue;
  return (
    <span style={{display:"inline-flex",alignItems:"center",gap:"3px",background:c+"18",color:c,
      fontSize:"9px",fontWeight:700,padding:"2px 8px",borderRadius:"20px",
      border:`1px solid ${c}30`,whiteSpace:"nowrap"}}>
      ● {product}
    </span>
  );
}

function HomeBtn({ onClick }) {
  return (
    <button onClick={onClick} style={{display:"flex",alignItems:"center",gap:"5px",
      background:"none",border:`1px solid ${C.border}`,borderRadius:"7px",
      padding:"5px 12px",cursor:"pointer",color:C.midGray,fontSize:"11px",fontWeight:600,
      transition:"all 0.15s"}}
      onMouseEnter={e=>{e.currentTarget.style.background=C.offWhite;e.currentTarget.style.color=C.blue;}}
      onMouseLeave={e=>{e.currentTarget.style.background="none";e.currentTarget.style.color=C.midGray;}}>
      🏠 Home
    </button>
  );
}

// ─── AQW Flow Modal ───────────────────────────────────────────────────────────
function AQWFlow({ onClose }) {
  const [step, setStep] = useState(0);
  const steps = ["Enter question","Check precedent","Draft response","Governance check"];
  const draft = `Dear [Member's name],\n\nThank you for your Assembly Written Question (Ref: Q1891) regarding Housing Allocation Policy.\n\nI can confirm that the current Housing Selection Scheme prioritises applicants based on assessed housing need, in accordance with the Housing (Northern Ireland) Order 1988 and subsequent amendments. Allocation decisions are made by the Northern Ireland Housing Executive using a points-based system that accounts for overcrowding, unfitness, and medical need.\n\nFor Q4 2025, 94% of allocations were made to applicants in the highest need bands. The Department continues to monitor outcomes and is committed to ensuring the scheme operates fairly and transparently.\n\n[Minister's name]`;

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(15,27,61,0.6)",display:"flex",
      alignItems:"center",justifyContent:"center",zIndex:300,padding:"16px"}}>
      <div style={{background:"white",borderRadius:"16px",width:"min(660px,95vw)",
        maxHeight:"88vh",overflowY:"auto",boxShadow:"0 32px 80px rgba(0,0,0,0.25)"}}>
        <div style={{background:`linear-gradient(135deg,${C.dark},${C.blue})`,padding:"18px 22px",
          borderRadius:"16px 16px 0 0",display:"flex",alignItems:"center",gap:"12px"}}>
          <div style={{width:"36px",height:"36px",background:"rgba(255,255,255,0.15)",borderRadius:"8px",
            display:"flex",alignItems:"center",justifyContent:"center",fontSize:"18px"}}>📝</div>
          <div style={{flex:1}}>
            <div style={{fontSize:"15px",fontWeight:700,color:"white"}}>AQW Response Agent</div>
            <div style={{fontSize:"10px",color:"rgba(255,255,255,0.55)"}}>Ref: Q1891 — Housing Allocation Policy · Due 17:00 · 200 word limit</div>
          </div>
          <button onClick={onClose} style={{background:"rgba(255,255,255,0.15)",border:"none",
            color:"white",borderRadius:"6px",padding:"5px 12px",cursor:"pointer",fontSize:"12px"}}>✕ Close</button>
        </div>
        <div style={{padding:"22px"}}>
          {/* Step bar */}
          <div style={{display:"flex",gap:"5px",marginBottom:"22px"}}>
            {steps.map((s,i)=>(
              <div key={i} style={{flex:1,padding:"8px 4px",borderRadius:"7px",textAlign:"center",
                background:i<step?"#ECFDF5":i===step?C.blue+"10":C.offWhite,
                border:`1px solid ${i<step?"#10B981":i===step?C.blue:C.border}`}}>
                <div style={{fontSize:"9px",fontWeight:600,
                  color:i<step?"#065F46":i===step?C.blue:C.midGray}}>
                  {i<step?"✓ ":""}{s}
                </div>
              </div>
            ))}
          </div>

          {step===0&&(
            <div>
              <div style={{fontSize:"12px",fontWeight:600,color:C.textDark,marginBottom:"14px"}}>
                Enter the Assembly Written Question you have received
              </div>
              <div style={{background:C.offWhite,borderRadius:"10px",padding:"16px",border:`1px solid ${C.border}`}}>
                <div style={{fontSize:"10px",color:C.midGray,fontWeight:700,marginBottom:"6px",textTransform:"uppercase",letterSpacing:"0.6px"}}>Reference</div>
                <div style={{fontFamily:"monospace",fontSize:"12px",background:"white",padding:"7px 12px",borderRadius:"6px",border:`1px solid ${C.border}`,marginBottom:"12px"}}>Q1891/22-27</div>
                <div style={{fontSize:"10px",color:C.midGray,fontWeight:700,marginBottom:"6px",textTransform:"uppercase",letterSpacing:"0.6px"}}>Question text</div>
                <div style={{fontFamily:"serif",fontSize:"12px",color:C.textDark,background:"white",padding:"10px 12px",borderRadius:"6px",border:`1px solid ${C.border}`,lineHeight:1.65}}>
                  "To ask the Minister for Communities to outline the criteria used to determine housing allocation priority under the current Housing Selection Scheme, and to provide data on the percentage of allocations made to applicants in the highest need bands during Q4 2025."
                </div>
              </div>
              <button onClick={()=>setStep(1)} style={{marginTop:"16px",background:C.blue,color:"white",border:"none",borderRadius:"8px",padding:"10px 24px",fontSize:"12px",fontWeight:600,cursor:"pointer"}}>Check precedent →</button>
            </div>
          )}

          {step===1&&(
            <div>
              <div style={{background:"#FFFBEB",border:"1px solid #F59E0B",borderRadius:"10px",padding:"14px 16px",marginBottom:"14px"}}>
                <div style={{fontWeight:700,color:"#78350F",fontSize:"12px",marginBottom:"8px"}}>⚠ 2 similar questions found in the archive</div>
                <div style={{fontSize:"11px",color:"#92400E",marginBottom:"12px"}}>Review before proceeding. Your response must align with or acknowledge the previous ministerial position.</div>
                {[
                  {ref:"Q1204/22-27",date:"March 2024",summary:"Housing Benefit waiting times — confirmed NIHE points-based system, cited Housing (NI) Order 1988. Minister committed to quarterly reporting."},
                  {ref:"Q0891/22-27",date:"November 2023",summary:"Housing allocation policy — outlined highest need band prioritisation. Minister confirmed 91% of Q3 2023 allocations from top two need bands."},
                ].map((q,i)=>(
                  <div key={i} style={{background:"white",border:"1px solid #FDE68A",borderRadius:"8px",padding:"11px 13px",marginBottom:"7px"}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:"4px"}}>
                      <span style={{fontSize:"11px",fontWeight:700,color:C.textDark}}>{q.ref}</span>
                      <span style={{fontSize:"9px",color:C.midGray}}>{q.date}</span>
                    </div>
                    <div style={{fontSize:"11px",color:C.midGray,lineHeight:1.4}}>{q.summary}</div>
                    <span style={{fontSize:"9px",color:C.blue,cursor:"pointer",fontWeight:600}}>View full response →</span>
                  </div>
                ))}
              </div>
              <div style={{display:"flex",gap:"8px"}}>
                <button onClick={()=>setStep(2)} style={{background:C.blue,color:"white",border:"none",borderRadius:"7px",padding:"9px 18px",fontSize:"12px",fontWeight:600,cursor:"pointer"}}>Proceed with new draft →</button>
                <button style={{background:"white",color:C.textDark,border:`1px solid ${C.border}`,borderRadius:"7px",padding:"9px 12px",fontSize:"12px",cursor:"pointer"}}>Use precedent as basis</button>
              </div>
            </div>
          )}

          {step===2&&(
            <div>
              <div style={{background:C.offWhite,borderRadius:"10px",padding:"16px",border:`1px solid ${C.border}`,marginBottom:"12px"}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:"10px",alignItems:"center"}}>
                  <span style={{fontSize:"9px",fontWeight:700,color:C.midGray,textTransform:"uppercase",letterSpacing:"0.8px"}}>Generated Draft</span>
                  <div style={{display:"flex",gap:"5px",alignItems:"center"}}>
                    <span style={{fontSize:"10px",color:C.green,fontWeight:600}}>✓ 187 words</span>
                    <MsBadge product="M365 Copilot" color={C.msBlue}/>
                  </div>
                </div>
                <div style={{fontSize:"11px",color:C.textDark,lineHeight:1.75,whiteSpace:"pre-line",fontFamily:"Georgia,serif"}}>{draft}</div>
              </div>
              <div style={{background:"#EFF6FF",borderRadius:"8px",padding:"9px 13px",marginBottom:"12px",fontSize:"10px",color:C.blue}}>
                ℹ Consistent with Q1204/22-27 (March 2024). Updated Q4 2025 data incorporated. First-person tone applied.
              </div>
              <div style={{display:"flex",gap:"8px"}}>
                <button onClick={()=>setStep(3)} style={{background:C.green,color:"white",border:"none",borderRadius:"7px",padding:"9px 18px",fontSize:"12px",fontWeight:600,cursor:"pointer"}}>Run governance check →</button>
                <button style={{background:"white",color:C.textDark,border:`1px solid ${C.border}`,borderRadius:"7px",padding:"9px 12px",fontSize:"12px",cursor:"pointer"}}>Edit</button>
                <button style={{background:"white",color:C.textDark,border:`1px solid ${C.border}`,borderRadius:"7px",padding:"9px 12px",fontSize:"12px",cursor:"pointer"}}>Regenerate</button>
              </div>
            </div>
          )}

          {step===3&&(
            <div>
              <div style={{background:"#ECFDF5",border:"1px solid #10B981",borderRadius:"10px",padding:"14px 16px",marginBottom:"12px"}}>
                <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"}}>
                  <span style={{fontSize:"16px"}}>✅</span>
                  <span style={{fontWeight:700,color:"#065F46",fontSize:"13px"}}>Governance check passed</span>
                  <MsBadge product="Purview" color={C.msBlue}/>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"5px"}}>
                  {["No sensitive data detected","Consistent with Q1204/22-27","Word limit: 187/200 ✓","First-person tone verified","Approved sources used","Audit trail → Purview"].map((c,i)=>(
                    <div key={i} style={{fontSize:"10px",color:"#065F46",display:"flex",gap:"4px"}}>✓ {c}</div>
                  ))}
                </div>
              </div>
              <div style={{background:C.offWhite,borderRadius:"10px",padding:"16px",border:`1px solid ${C.border}`,marginBottom:"12px"}}>
                <div style={{fontSize:"11px",color:C.textDark,lineHeight:1.75,whiteSpace:"pre-line",fontFamily:"Georgia,serif"}}>{draft}</div>
              </div>
              <div style={{display:"flex",gap:"8px",flexWrap:"wrap"}}>
                <button style={{background:C.blue,color:"white",border:"none",borderRadius:"7px",padding:"9px 18px",fontSize:"12px",fontWeight:600,cursor:"pointer"}}>Send for clearance →</button>
                <button style={{background:"white",color:C.textDark,border:`1px solid ${C.border}`,borderRadius:"7px",padding:"9px 12px",fontSize:"12px",cursor:"pointer"}}>Save to SharePoint</button>
                <button style={{background:"white",color:C.textDark,border:`1px solid ${C.border}`,borderRadius:"7px",padding:"9px 12px",fontSize:"12px",cursor:"pointer"}}>Download .docx</button>
              </div>
              <div style={{marginTop:"8px",fontSize:"9px",color:C.midGray}}>⏱ 3 min 42 sec · ~3.5 hrs saved · Logged to Viva Insights · Clearance workflow initiated</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Advisor Chat ─────────────────────────────────────────────────────────────
function AdvisorChat({ rc, deptName, onClose }) {
  const title = `${deptName||"NICS"} AI Companion`;
  const [msgs, setMsgs] = useState([
    { role:"agent", text:`Good morning, ${rc.name}. I'm your ${title}. I can help you find the right tool, understand what's on your plate, or guide you through your day. What do you need?` }
  ]);
  const [input, setInput] = useState("");
  const chips = ["What should I prioritise today?","Help me with my AQW response","How do I analyse consultation responses?","What's my Copilot IQ?"];

  function send(q) {
    q = q || input; if(!q.trim()) return; setInput("");
    setMsgs(p=>[...p,{role:"user",text:q}]);
    setTimeout(()=>{
      const ql = q.toLowerCase();
      let r = "";
      if(ql.includes("priorit")||ql.includes("today"))
        r=`Your two most urgent items today are: **${rc.tasks[0].title}** (due ${rc.tasks[0].time}) and **${rc.tasks[1].title}** (due ${rc.tasks[1].time}). I'd start with the first — use the **${rc.tools[0].name}** to get moving quickly.`;
      else if(ql.includes("aqw")||ql.includes("assembly"))
        r="The **AQW Response Agent** first checks your archive for similar questions — many are repeated, and surfacing precedent saves significant time and ensures consistency. If no match is found, it drafts a new response from approved SharePoint content, within the 200-word limit and first-person tone. Click 'Check if this AQW has been asked before' in your Top Actions.";
      else if(ql.includes("consult"))
        r="The **Civic Insight Agent** handles consultation analysis end-to-end. It ingests responses, identifies themes and outliers, and generates a balanced, audit-ready report. Human judgement remains central throughout — the agent drafts, you decide. Particularly effective for volumes over 100 responses.";
      else if(ql.includes("copilot iq")||ql.includes("score"))
        r=`Your Copilot IQ is **${rc.copilotIq.score}/100** — ${rc.copilotIq.level}. ${rc.copilotIq.trend}. ${rc.copilotIq.badge}. ${rc.copilotIq.saved}`;
      else
        r=`Good question. Based on your role, I'd start with the **${rc.tools[0].name}** — it's configured for your most common tasks today. What specifically do you need to get done right now?`;
      setMsgs(p=>[...p,{role:"agent",text:r}]);
    },450);
  }

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(15,27,61,0.5)",display:"flex",
      alignItems:"center",justifyContent:"center",zIndex:300,padding:"16px"}}>
      <div style={{background:"white",borderRadius:"16px",width:"min(500px,95vw)",maxHeight:"78vh",
        display:"flex",flexDirection:"column",boxShadow:"0 24px 60px rgba(0,0,0,0.18)"}}>
        <div style={{background:C.blue,padding:"14px 18px",borderRadius:"16px 16px 0 0",
          display:"flex",alignItems:"center",gap:"10px"}}>
          <span style={{fontSize:"18px"}}>🧭</span>
          <div style={{flex:1}}>
            <div style={{fontSize:"13px",fontWeight:700,color:"white"}}>{title}</div>
            <div style={{fontSize:"9px",color:"rgba(255,255,255,0.6)"}}>Powered by M365 Copilot</div>
          </div>
          <button onClick={onClose} style={{background:"rgba(255,255,255,0.18)",border:"none",color:"white",borderRadius:"6px",padding:"4px 10px",cursor:"pointer",fontSize:"11px"}}>✕</button>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"14px",display:"flex",flexDirection:"column",gap:"9px"}}>
          {msgs.map((m,i)=>(
            <div key={i} style={{display:"flex",gap:"7px",justifyContent:m.role==="user"?"flex-end":"flex-start"}}>
              {m.role==="agent"&&<div style={{width:"26px",height:"26px",background:C.blue,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"12px",flexShrink:0}}>🧭</div>}
              <div style={{background:m.role==="user"?C.blue:C.offWhite,color:m.role==="user"?"white":C.textDark,
                padding:"9px 12px",borderRadius:m.role==="user"?"12px 12px 4px 12px":"12px 12px 12px 4px",
                fontSize:"11px",lineHeight:1.55,maxWidth:"82%"}}>
                {m.text.split("**").map((p,j)=>j%2===1?<strong key={j}>{p}</strong>:p)}
              </div>
            </div>
          ))}
        </div>
        <div style={{padding:"10px 12px",borderTop:`1px solid ${C.border}`}}>
          <div style={{display:"flex",gap:"4px",flexWrap:"wrap",marginBottom:"7px"}}>
            {chips.map((s,i)=>(
              <button key={i} onClick={()=>send(s)} style={{fontSize:"10px",background:C.offWhite,color:C.blue,
                border:`1px solid ${C.border}`,borderRadius:"20px",padding:"3px 9px",cursor:"pointer",fontWeight:500}}>{s}</button>
            ))}
          </div>
          <div style={{display:"flex",gap:"6px"}}>
            <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()}
              placeholder={`Ask your ${deptName||"NICS"} AI Companion...`} style={{flex:1,border:`1px solid ${C.border}`,
              borderRadius:"8px",padding:"8px 11px",fontSize:"11px",outline:"none",fontFamily:"inherit",background:C.offWhite}}/>
            <button onClick={()=>send()} style={{background:C.blue,color:"white",border:"none",
              borderRadius:"8px",padding:"8px 16px",fontSize:"11px",fontWeight:600,cursor:"pointer"}}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Agent Flow Modal ─────────────────────────────────────────────────────────
const AGENT_FLOWS = {
  aqw_response: {
    name:"AQW Response Agent",icon:"📝",color:C.blue,ms:"Copilot Studio",
    tagline:"From question received to cleared draft — in minutes, not hours.",
    steps:[
      { id:0, label:"Receive question",  icon:"📥", who:"You",        desc:"Paste or type the Assembly Written Question reference and full text into the agent.",                          output:null },
      { id:1, label:"Precedent check",   icon:"🔎", who:"Agent",      desc:"Agent searches the full AQW archive — up to 100 questions/week, 1,900+ over a parliament — for identical or substantially similar questions.",  output:"2 similar questions found: Q1204 (March 2024) and Q0891 (November 2023). Links and summaries surfaced." },
      { id:2, label:"Policy retrieval",  icon:"📂", who:"Agent",      desc:"Pulls approved policy content from the designated SharePoint site. Applies word limits, first-person tone, and content restrictions automatically.", output:"4 relevant policy excerpts retrieved from SharePoint. Constraints applied: 200 words, first-person, restricted content flagged." },
      { id:3, label:"Draft generated",   icon:"✍️", who:"Agent",      desc:"A full draft response is generated, consistent with precedent and current departmental position. Ready for your review.",                         output:"Draft response — 187 words. Consistent with Q1204/22-27. First-person tone verified." },
      { id:4, label:"You review",        icon:"👤", who:"You",        desc:"Read, edit, and adjust the draft. Human judgement and ministerial knowledge stays with you. The agent supports, never replaces.",                  output:null },
      { id:5, label:"Governance check",  icon:"🛡️", who:"Agent",      desc:"Purview scans the final draft for sensitive data exposure, consistency with previous positions, and audit trail logging before clearance.",      output:"✓ No sensitive data · ✓ Consistent with precedent · ✓ Audit logged to Purview · Ready for clearance" },
      { id:6, label:"Send for clearance",icon:"✅", who:"You",        desc:"Submit through the existing Ministerial clearance process. The agent has prepared everything — you make the final call.",                        output:null },
    ],
    saves:"~3.5 hours per AQW response",
    agents:["AQW Response Agent","Policy Researcher Agent"],
    ms:["Copilot Studio","SharePoint","Purview","M365 Copilot"],
  },
  civic_insight: {
    name:"Civic Insight Agent",icon:"📊",color:C.nicsGreen,ms:"M365 Copilot",
    tagline:"From hundreds of consultation responses to a balanced, audit-ready report.",
    steps:[
      { id:0, label:"Upload responses",    icon:"📥", who:"You",   desc:"Consultation responses are uploaded to a controlled SharePoint folder. Citizenspace structured responses and email submissions are both supported.", output:null },
      { id:1, label:"Data ingestion",      icon:"⚙️", who:"Agent", desc:"Agent ingests and categorises all responses. Personal data is automatically excluded from outputs in line with GDPR and least-privilege principles.", output:"340 responses ingested. 12 excluded (personal data flagged). 328 valid for analysis." },
      { id:2, label:"Theme extraction",    icon:"🏷️", who:"Agent", desc:"Identifies recurring themes, consensus areas, salient points, and notable outliers. Each theme is traced back to specific responses — no black box.", output:"6 primary themes identified. 2 outlier positions surfaced. 14 scope-boundary items flagged for human review." },
      { id:3, label:"Human review",        icon:"👤", who:"You",   desc:"You review, challenge, and confirm the emerging themes. The agent does not interpret — it organises. Final judgement is always yours.",             output:null },
      { id:4, label:"Draft report",        icon:"✍️", who:"Agent", desc:"Generates a structured narrative consultation report: overview, methodology, themes, evidence, outliers, limitations, and audit trail section.",   output:"Draft report — ~2,400 words. Balanced narrative. Minority views included. Traceability table generated." },
      { id:5, label:"Fairness check",      icon:"⚖️", who:"Agent", desc:"Automated fairness check: balanced representation, accessible language, consistent terminology, facts separated from interpretations.",             output:"✓ Balanced representation · ✓ Plain English verified · ✓ Disability language guidelines met · ✓ Audit trail complete" },
      { id:6, label:"Publish & archive",   icon:"✅", who:"You",   desc:"Final report reviewed and approved by you. Published and archived with full response traceability. Ready for policy and regulatory decisions.",      output:null },
    ],
    saves:"~2–3 weeks analyst time per major consultation",
    agents:["Civic Insight Agent","Theme Extraction Agent","Analyst Agent"],
    ms:["M365 Copilot","SharePoint","Purview","Copilot Studio"],
  },
  policy_researcher: {
    name:"Policy Researcher Agent",icon:"🔎",color:C.purple,ms:"SharePoint + Graph API",
    tagline:"Research other jurisdictions and surface evidence — in minutes, not days.",
    steps:[
      { id:0, label:"Define research question", icon:"💬", who:"You",   desc:"Describe what you need — e.g. 'How have devolved governments in Scotland and Wales approached housing allocation reform since 2021?'", output:null },
      { id:1, label:"Source identification",    icon:"🌐", who:"Agent", desc:"Agent identifies relevant sources: devolved government publications, legislation databases, academic papers, and approved internal SharePoint archives.", output:"23 relevant sources identified across Scottish Government, Senedd Cymru, and NI Assembly research papers." },
      { id:2, label:"Content extraction",       icon:"📖", who:"Agent", desc:"Extracts and synthesises key findings from each source. Preserves attribution — every claim is linked back to its original document.",           output:"11 evidence summaries generated. 4 directly comparable policy frameworks found. Source links retained." },
      { id:3, label:"Comparative summary",      icon:"📊", who:"Agent", desc:"Generates a structured comparative summary: what each jurisdiction did, outcomes reported, and relevance to your specific policy context.",       output:"Comparative table: Scotland Housing Act 2014 reforms, Wales RENTING HOMES Act 2016, and 3 NI-relevant precedents." },
      { id:4, label:"You review & adapt",       icon:"👤", who:"You",   desc:"You review the evidence, apply your policy judgement, and decide what is transferable to the Northern Ireland context. Agent prepares, you decide.", output:null },
      { id:5, label:"Briefing note ready",      icon:"📄", who:"Agent", desc:"Structured briefing note generated in departmental format — ready for ministerial submission or policy team discussion.",                          output:"Briefing note — 650 words. Evidence base cited. Ready for insertion into policy development process." },
    ],
    saves:"~50% of research time on devolved framework comparisons",
    agents:["Policy Researcher Agent","Briefing Note Generator"],
    ms:["SharePoint","Graph API","M365 Copilot","Copilot Studio"],
  },
  business_case: {
    name:"Business Case Support Agent",icon:"£",color:C.amber,ms:"M365 Copilot",
    tagline:"Draft the hardest sections of a business case — the strategic case, spending objectives, risks and benefits.",
    steps:[
      { id:0, label:"Upload brief & mandate",  icon:"📥", who:"You",   desc:"Upload your programme brief, mandate document, or initial project notes. The agent reads and extracts the key inputs automatically.",            output:null },
      { id:1, label:"Context extraction",      icon:"⚙️", who:"Agent", desc:"Extracts costs, scope, risks, objectives, and stakeholder information. Maps these to the standard NICS business case structure (MSP-aligned).",    output:"Key inputs extracted: £240K estimated cost, 18-month timeline, 4 risk areas identified, 3 strategic objectives." },
      { id:2, label:"Strategic case draft",    icon:"✍️", who:"Agent", desc:"Drafts the Strategic Case section including the rationale, policy alignment, and case for change. References existing NICS frameworks.",          output:"Strategic Case draft — 480 words. PfG alignment mapped. Case for change structured across 3 pillars." },
      { id:3, label:"Spending objectives",     icon:"📊", who:"Agent", desc:"Generates spending objectives and benefits framework, linking investment to measurable outcomes and departmental priorities.",                    output:"5 spending objectives drafted. Benefits mapped to efficiency, quality, and public value dimensions." },
      { id:4, label:"Risk register starter",   icon:"⚠️", who:"Agent", desc:"Generates an initial risk register with likelihood/impact ratings and mitigation suggestions based on comparable cases from the archive.",        output:"12 risks identified. 3 rated high. Mitigation suggestions provided. Ready for your expert review." },
      { id:5, label:"You review & complete",   icon:"👤", who:"You",   desc:"You apply your departmental knowledge, adjust figures, and complete remaining sections. The hardest parts are already drafted.",                  output:null },
    ],
    saves:"Up to 8 hours on moderate and major business cases",
    agents:["Business Case Support Agent","Policy Researcher Agent"],
    ms:["M365 Copilot","SharePoint","Copilot Studio"],
  },
};

function AgentFlowModal({ flowId, onClose }) {
  const flow = AGENT_FLOWS[flowId];
  const [activeStep, setActiveStep] = useState(0);
  if(!flow) return null;
  const step = flow.steps[activeStep];
  const isLast = activeStep === flow.steps.length - 1;

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(15,27,61,0.65)",display:"flex",
      alignItems:"center",justifyContent:"center",zIndex:300,padding:"16px"}}>
      <div style={{background:"white",borderRadius:"16px",width:"min(780px,96vw)",
        maxHeight:"90vh",display:"flex",flexDirection:"column",
        boxShadow:"0 32px 80px rgba(0,0,0,0.28)"}}>

        {/* Header */}
        <div style={{background:`linear-gradient(135deg,${C.dark},${flow.color})`,
          padding:"18px 22px",borderRadius:"16px 16px 0 0",display:"flex",alignItems:"flex-start",gap:"12px"}}>
          <div style={{width:"40px",height:"40px",background:"rgba(255,255,255,0.15)",borderRadius:"10px",
            display:"flex",alignItems:"center",justifyContent:"center",fontSize:"20px",flexShrink:0}}>{flow.icon}</div>
          <div style={{flex:1}}>
            <div style={{fontSize:"16px",fontWeight:700,color:"white",marginBottom:"3px"}}>{flow.name}</div>
            <div style={{fontSize:"11px",color:"rgba(255,255,255,0.65)"}}>{flow.tagline}</div>
            <div style={{display:"flex",gap:"5px",marginTop:"8px",flexWrap:"wrap"}}>
              {flow.agents.map(a=>(
                <span key={a} style={{fontSize:"9px",background:"rgba(255,255,255,0.15)",color:"white",
                  padding:"2px 8px",borderRadius:"20px",fontWeight:600}}>🤖 {a}</span>
              ))}
              {flow.ms.map(m=>(
                <span key={m} style={{fontSize:"9px",background:"rgba(255,255,255,0.08)",color:"rgba(255,255,255,0.6)",
                  padding:"2px 8px",borderRadius:"20px"}}>● {m}</span>
              ))}
            </div>
          </div>
          <button onClick={onClose} style={{background:"rgba(255,255,255,0.15)",border:"none",color:"white",
            borderRadius:"7px",padding:"5px 12px",cursor:"pointer",fontSize:"12px",flexShrink:0}}>✕ Close</button>
        </div>

        <div style={{display:"flex",flex:1,overflow:"hidden"}}>
          {/* Step list */}
          <div style={{width:"200px",borderRight:`1px solid ${C.border}`,overflowY:"auto",flexShrink:0}}>
            {flow.steps.map((s,i)=>(
              <div key={i} onClick={()=>setActiveStep(i)}
                style={{padding:"11px 14px",cursor:"pointer",borderBottom:`1px solid ${C.border}`,
                background:activeStep===i?flow.color+"10":"white",
                borderLeft:activeStep===i?`3px solid ${flow.color}`:"3px solid transparent",
                transition:"all 0.12s"}}
                onMouseEnter={e=>{if(activeStep!==i)e.currentTarget.style.background=C.offWhite;}}
                onMouseLeave={e=>{if(activeStep!==i)e.currentTarget.style.background="white";}}>
                <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
                  <div style={{width:"24px",height:"24px",borderRadius:"50%",flexShrink:0,
                    background:i<activeStep?C.green:activeStep===i?flow.color:C.border,
                    display:"flex",alignItems:"center",justifyContent:"center"}}>
                    {i<activeStep
                      ? <span style={{fontSize:"10px",color:"white",fontWeight:900}}>✓</span>
                      : <span style={{fontSize:"11px"}}>{s.icon}</span>
                    }
                  </div>
                  <div>
                    <div style={{fontSize:"10px",fontWeight:activeStep===i?700:500,
                      color:activeStep===i?flow.color:C.textDark}}>{s.label}</div>
                    <div style={{fontSize:"9px",color:s.who==="Agent"?flow.color:C.midGray,fontWeight:s.who==="Agent"?600:400}}>{s.who}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Step detail */}
          <div style={{flex:1,padding:"20px 22px",overflowY:"auto",display:"flex",flexDirection:"column",gap:"14px"}}>
            <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
              <div style={{width:"38px",height:"38px",borderRadius:"10px",
                background:step.who==="Agent"?flow.color+"18":C.offWhite,
                border:`1px solid ${step.who==="Agent"?flow.color:C.border}`,
                display:"flex",alignItems:"center",justifyContent:"center",fontSize:"18px"}}>{step.icon}</div>
              <div>
                <div style={{fontSize:"15px",fontWeight:700,color:C.textDark}}>{step.label}</div>
                <div style={{display:"flex",alignItems:"center",gap:"6px"}}>
                  <span style={{fontSize:"10px",background:step.who==="Agent"?flow.color+"18":C.offWhite,
                    color:step.who==="Agent"?flow.color:C.midGray,padding:"2px 8px",borderRadius:"20px",fontWeight:600}}>
                    {step.who==="Agent"?"🤖 AI Agent":"👤 You"}
                  </span>
                  <span style={{fontSize:"9px",color:C.midGray}}>Step {activeStep+1} of {flow.steps.length}</span>
                </div>
              </div>
            </div>

            <div style={{background:C.offWhite,borderRadius:"10px",padding:"14px 16px",
              border:`1px solid ${C.border}`,fontSize:"13px",color:C.textDark,lineHeight:1.65}}>
              {step.desc}
            </div>

            {step.output&&(
              <div style={{background:flow.color+"08",borderRadius:"10px",padding:"14px 16px",
                border:`1px solid ${flow.color}30`}}>
                <div style={{fontSize:"9px",fontWeight:700,color:flow.color,textTransform:"uppercase",
                  letterSpacing:"0.7px",marginBottom:"6px"}}>✦ Agent output</div>
                <div style={{fontSize:"12px",color:C.textDark,lineHeight:1.55}}>{step.output}</div>
              </div>
            )}

            {step.who==="You"&&(
              <div style={{background:"#F0FFF4",borderRadius:"10px",padding:"12px 14px",
                border:"1px solid #BBF7D0",fontSize:"11px",color:"#065F46",lineHeight:1.5}}>
                <strong>Human in the loop:</strong> Compass supports your work — it never replaces your judgement, expertise, or responsibility. This step is yours.
              </div>
            )}

            {/* Nav buttons */}
            <div style={{display:"flex",gap:"8px",marginTop:"auto",paddingTop:"8px"}}>
              <button onClick={()=>setActiveStep(i=>Math.max(0,i-1))} disabled={activeStep===0}
                style={{background:"white",color:C.textDark,border:`1px solid ${C.border}`,borderRadius:"8px",
                padding:"8px 16px",fontSize:"12px",cursor:activeStep===0?"not-allowed":"pointer",
                opacity:activeStep===0?0.4:1}}>← Previous</button>
              <button onClick={()=>setActiveStep(i=>Math.min(flow.steps.length-1,i+1))} disabled={isLast}
                style={{background:isLast?"#D1D5DB":flow.color,color:"white",border:"none",borderRadius:"8px",
                padding:"8px 20px",fontSize:"12px",fontWeight:600,cursor:isLast?"not-allowed":"pointer"}}>
                {isLast?"Flow complete ✓":"Next step →"}</button>
              {isLast&&(
                <div style={{display:"flex",alignItems:"center",gap:"6px",marginLeft:"auto",
                  background:C.green+"15",borderRadius:"8px",padding:"8px 12px"}}>
                  <span style={{fontSize:"12px"}}>⏱</span>
                  <span style={{fontSize:"11px",color:C.green,fontWeight:600}}>{flow.saves}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Work Items component ──────────────────────────────────────────────────────
const AGENT_CATALOGUE = [
  { id:"aqw_response",    name:"AQW Response Agent",        icon:"📝", category:"Parliamentary", tag:"Priority", tagColor:C.coral,
    desc:"Check precedent → retrieve policy → draft response → governance check. Reduces ~3.5 hrs to minutes.",
    who:"Policy Officers, Communications Staff", ms:"Copilot Studio + SharePoint + Purview",
    agents:["AQW Response Agent","Policy Researcher"] },
  { id:"civic_insight",   name:"Civic Insight Agent",       icon:"📊", category:"Consultation",  tag:"Active",   tagColor:C.nicsGreen,
    desc:"Ingest responses → extract themes → human review → draft balanced report → fairness check.",
    who:"Consultation Analysts, Policy Staff", ms:"M365 Copilot + SharePoint + Purview",
    agents:["Civic Insight Agent","Theme Extraction Agent","Analyst Agent"] },
  { id:"policy_researcher",name:"Policy Researcher Agent",  icon:"🔎", category:"Research",      tag:"Popular",  tagColor:C.blue,
    desc:"Define question → identify sources → extract evidence → comparative summary → briefing note ready.",
    who:"Policy Officers, Analysts", ms:"SharePoint + Graph API + M365 Copilot",
    agents:["Policy Researcher Agent","Briefing Note Generator"] },
  { id:"business_case",   name:"Business Case Support",     icon:"£",  category:"Finance",       tag:"New",      tagColor:C.amber,
    desc:"Upload brief → extract context → draft Strategic Case → spending objectives → risk register. Saves up to 8 hrs.",
    who:"Policy Creation, Finance Staff", ms:"M365 Copilot + SharePoint",
    agents:["Business Case Support Agent","Policy Researcher Agent"] },
  { id:"comms_author",    name:"Communications Author",     icon:"📣", category:"Communications",tag:"Live",     tagColor:C.green,
    desc:"Provide guidance → generate communications → tone-match to audience → human review → publish.",
    who:"Communications Officers", ms:"Copilot Studio + M365 Copilot",
    agents:["Communications Author Agent"] },
  { id:"it_helpdesk",     name:"IT Helpdesk Agent",         icon:"🖥️", category:"IT & Digital",  tag:"Live",     tagColor:C.green,
    desc:"Staff raises request → agent queries Book of Knowledge → resolves or routes → audit trail.",
    who:"IT Service Desk, All Staff", ms:"Agent 365 + SharePoint",
    agents:["IT Helpdesk Agent"] },
];

function WorkItems({ rc, onLaunchAQW }) {
  const [selectedFlow, setSelectedFlow] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All",...[...new Set(AGENT_CATALOGUE.map(a=>a.category))]];
  const filtered = activeCategory==="All" ? AGENT_CATALOGUE : AGENT_CATALOGUE.filter(a=>a.category===activeCategory);

  function handleLaunch(id) {
    if(id==="aqw_response") { onLaunchAQW(); return; }
    if(AGENT_FLOWS[id]) setSelectedFlow(id);
  }

  return (
    <div>
      {/* Category filter pills */}
      <div style={{display:"flex",gap:"6px",marginBottom:"16px",flexWrap:"wrap"}}>
        {categories.map(cat=>(
          <button key={cat} onClick={()=>setActiveCategory(cat)}
            style={{background:activeCategory===cat?C.blue:"white",
            color:activeCategory===cat?"white":C.midGray,
            border:`1px solid ${activeCategory===cat?C.blue:C.border}`,
            borderRadius:"20px",padding:"4px 12px",fontSize:"10px",fontWeight:activeCategory===cat?700:400,
            cursor:"pointer",transition:"all 0.15s"}}>
            {cat}
          </button>
        ))}
      </div>

      {/* Agent cards */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"12px"}}>
        {filtered.map(agent=>(
          <div key={agent.id}
            style={{background:"white",borderRadius:"12px",border:`1px solid ${C.border}`,
            padding:"16px",boxShadow:"0 1px 4px rgba(0,0,0,0.04)",
            display:"flex",flexDirection:"column",gap:"10px"}}>

            {/* Card header */}
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
                <div style={{width:"36px",height:"36px",background:agent.tagColor+"15",borderRadius:"9px",
                  display:"flex",alignItems:"center",justifyContent:"center",fontSize:"18px",flexShrink:0}}>
                  {agent.icon}
                </div>
                <div>
                  <div style={{fontSize:"12px",fontWeight:700,color:C.textDark,lineHeight:1.3}}>{agent.name}</div>
                  <span style={{fontSize:"8px",background:"#F1F5F9",color:C.midGray,padding:"1px 6px",borderRadius:"10px"}}>{agent.category}</span>
                </div>
              </div>
              <span style={{fontSize:"8px",background:agent.tagColor+"15",color:agent.tagColor,
                padding:"2px 7px",borderRadius:"20px",fontWeight:700,flexShrink:0}}>{agent.tag}</span>
            </div>

            {/* Description */}
            <div style={{fontSize:"10px",color:C.midGray,lineHeight:1.5}}>{agent.desc}</div>

            {/* Agent chips */}
            <div style={{display:"flex",gap:"4px",flexWrap:"wrap"}}>
              {agent.agents.map(a=>(
                <span key={a} style={{fontSize:"8px",background:C.blue+"10",color:C.blue,
                  padding:"2px 7px",borderRadius:"20px",fontWeight:600}}>🤖 {a}</span>
              ))}
            </div>

            {/* Footer */}
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",
              paddingTop:"8px",borderTop:`1px solid ${C.border}`}}>
              <div>
                <div style={{fontSize:"8px",color:C.midGray,marginBottom:"1px"}}>For: {agent.who}</div>
                <div style={{fontSize:"8px",color:C.midGray}}>{agent.ms}</div>
              </div>
              <button onClick={()=>handleLaunch(agent.id)}
                style={{background:agent.tagColor,color:"white",border:"none",borderRadius:"7px",
                padding:"6px 14px",fontSize:"10px",fontWeight:700,cursor:"pointer",
                display:"flex",alignItems:"center",gap:"5px",flexShrink:0}}>
                {AGENT_FLOWS[agent.id]?"See flow ▶":"Launch →"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedFlow&&<AgentFlowModal flowId={selectedFlow} onClose={()=>setSelectedFlow(null)}/>}
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
function Dashboard({ roleId, deptId, onHome, onBack }) {
  const rc = ROLE_CONTENT[roleId] || ROLE_CONTENT.policy;
  const dept = DEPARTMENTS.find(d=>d.id===deptId);
  const TABS = [
    { id:"glance",   label:"Today at a Glance", icon:"☀️" },
    { id:"work",     label:"Work Items",         icon:"🛠️" },
    { id:"readiness",label:"My Readiness",       icon:"📈" },
  ];
  const [activeTab, setActiveTab] = useState("glance");
  const [tasks, setTasks] = useState(rc.tasks);
  const [showAQW, setShowAQW] = useState(false);
  const [showAdvisor, setShowAdvisor] = useState(false);
  const [showTopActions, setShowTopActions] = useState(true);
  const [expandedMeeting, setExpandedMeeting] = useState(null);
  const [meetingSummary, setMeetingSummary] = useState({});

  function toggleTask(id){ setTasks(p=>p.map(t=>t.id===id?{...t,done:!t.done}:t)); }
  function launchTool(t){ if(t.id==="aqw"||t.id==="aqw2"||t.id==="aqw3") setShowAQW(true); }

  const doneCount = tasks.filter(t=>t.done).length;

  const MEETING_SUMMARIES = {
    0: { actions:["Gareth to circulate updated housing allocation data by EOD","Sarah to schedule follow-up with NIHE policy team","Review Q4 2025 figures before next AQW deadline"], decisions:["Agreed to use Q4 data as primary source for pending AQWs","Confirmed clearance process stays with private office"], summary:"Productive session covering three live AQWs on housing allocation. Team aligned on data sources and clearance timelines. All actions assigned." },
    1: { actions:["Draft AQW Q1891 response ready for review by 15:00","Confirm clearance window with Permanent Secretary office","Share precedent links to Q1204 and Q0891"], decisions:["Proceed with new draft — precedent from Q1204 covers same ground but needs updated Q4 figures","Minister's office to review final draft before 17:00 deadline"], summary:"Quick triage call to assign responsibility for five incoming AQWs. Q1891 is highest priority given 17:00 deadline." },
    2: { actions:["Upload 1,240 response files to SharePoint analysis folder","Run Civic Insight Agent on Water Quality batch first","Share theme extraction draft with policy lead by Thursday"], decisions:["Water Quality consultation to be analysed first given Minister briefing on Friday","Climate Change consultation to follow week commencing 18th"], summary:"Planning session for two live consultations. Civic Insight Agent to be used for both. Prioritisation agreed." },
  };

  return (
    <div style={{fontFamily:"'Segoe UI',system-ui,sans-serif",height:"100vh",display:"flex",flexDirection:"column",background:C.pageBg}}>
      {/* Header */}
      <div style={{background:"white",borderBottom:`1px solid ${C.border}`,height:"52px",
        display:"flex",alignItems:"center",padding:"0 18px",gap:"12px",flexShrink:0,
        boxShadow:"0 1px 4px rgba(0,0,0,0.04)"}}>
        <img src={NICS_LOGO} alt="NICS" style={{height:"26px",objectFit:"contain"}}/>
        <div style={{width:"1px",height:"22px",background:C.border}}/>
        <div style={{display:"flex",alignItems:"center",gap:"6px"}}>
          <span style={{fontSize:"15px"}}>🧭</span>
          <span style={{fontSize:"14px",fontWeight:700,color:C.textDark}}>Compass</span>
          <span style={{fontSize:"8px",background:"#EEF4FF",color:C.blue,padding:"2px 7px",borderRadius:"20px",fontWeight:600,border:`1px solid ${C.blue}22`}}>by Slalom</span>
        </div>
        <div style={{flex:1}}/>
        <HomeBtn onClick={onHome}/>
        <div style={{display:"flex",alignItems:"center",gap:"5px"}}>
          <span style={{fontSize:"8px",color:C.midGray}}>{dept?.short||""}</span>
          <div style={{width:"30px",height:"30px",background:rc.color,borderRadius:"50%",
            display:"flex",alignItems:"center",justifyContent:"center",fontSize:"11px",fontWeight:700,color:"white",cursor:"pointer"}}
            onClick={onBack}>{rc.avatar}</div>
        </div>
      </div>

      <div style={{display:"flex",flex:1,overflow:"hidden"}}>
        {/* Sidebar */}
        <div style={{width:"44px",background:"white",borderRight:`1px solid ${C.border}`,
          display:"flex",flexDirection:"column",alignItems:"center",paddingTop:"10px",gap:"3px",flexShrink:0}}>
          {[["🏠","Home",onHome],["🧭","Compass",null],["📌","Saved",null],["👤","Profile",null]].map(([icon,label,fn],i)=>(
            <div key={i} title={label} onClick={fn||undefined}
              style={{width:"34px",height:"34px",borderRadius:"8px",display:"flex",alignItems:"center",
              justifyContent:"center",fontSize:"15px",cursor:fn?"pointer":"default",
              background:i===1?rc.color+"18":"transparent"}}>
              {icon}
            </div>
          ))}
        </div>

        {/* Main content */}
        <div style={{flex:1,overflowY:"auto",padding:"20px"}}>
          {/* Greeting row */}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"18px",gap:"14px"}}>
            <div>
              <div style={{fontSize:"22px",fontWeight:300,color:C.textDark,marginBottom:"3px"}}>{rc.greeting}</div>
              <div style={{fontSize:"12px",color:C.midGray}}>{rc.tagline}</div>
            </div>
            {/* Advisor card */}
            <div style={{background:"white",border:`1px solid ${C.border}`,borderRadius:"12px",
              padding:"14px 16px",minWidth:"200px",flexShrink:0,boxShadow:"0 2px 6px rgba(0,0,0,0.04)"}}>
              <div style={{display:"flex",alignItems:"center",gap:"7px",marginBottom:"9px"}}>
                <span style={{fontSize:"14px"}}>🧭</span>
                <span style={{fontSize:"12px",fontWeight:700,color:C.textDark}}>{dept?.short||"NICS"} AI Companion</span>
              </div>
              <button onClick={()=>setShowAdvisor(true)} style={{background:C.blue,color:"white",border:"none",
                borderRadius:"7px",padding:"8px 12px",fontSize:"10px",fontWeight:700,cursor:"pointer",
                textTransform:"uppercase",letterSpacing:"0.4px",width:"100%"}}>Chat with AI Companion</button>
            </div>
          </div>

          {/* Tab bar */}
          <div style={{display:"flex",gap:"2px",borderBottom:`2px solid ${C.border}`,marginBottom:"18px"}}>
            {TABS.map(tab=>(
              <button key={tab.id} onClick={()=>setActiveTab(tab.id)}
                style={{background:"none",border:"none",padding:"8px 16px",cursor:"pointer",
                  fontSize:"12px",fontWeight:activeTab===tab.id?700:400,
                  color:activeTab===tab.id?C.blue:C.midGray,
                  borderBottom:activeTab===tab.id?`2px solid ${C.blue}`:"2px solid transparent",
                  marginBottom:"-2px",display:"flex",alignItems:"center",gap:"5px",whiteSpace:"nowrap"}}>
                <span>{tab.icon}</span>{tab.label}
              </button>
            ))}
          </div>

          {/* ── TODAY AT A GLANCE ── */}
          {activeTab==="glance"&&(
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"14px"}}>

              {/* Tasks */}
              <div style={{background:"white",borderRadius:"12px",border:`1px solid ${C.border}`,
                padding:"16px",boxShadow:"0 1px 4px rgba(0,0,0,0.04)"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"10px"}}>
                  <div style={{display:"flex",alignItems:"center",gap:"6px"}}>
                    <span style={{fontSize:"14px"}}>📋</span>
                    <span style={{fontSize:"13px",fontWeight:700,color:C.textDark}}>My Tasks</span>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:"6px"}}>
                    <span style={{fontSize:"10px",color:C.midGray}}>{doneCount}/{tasks.length} done</span>
                    <MsBadge product="Planner" color="#2564CF"/>
                  </div>
                </div>
                <div style={{height:"3px",background:C.border,borderRadius:"2px",marginBottom:"10px"}}>
                  <div style={{height:"3px",background:C.blue,borderRadius:"2px",
                    width:`${tasks.length?(doneCount/tasks.length)*100:0}%`,transition:"width 0.3s"}}/>
                </div>
                {tasks.map(t=>(
                  <div key={t.id} style={{display:"flex",alignItems:"flex-start",gap:"8px",
                    padding:"8px 0",borderBottom:`1px solid ${C.border}`,opacity:t.done?0.45:1}}>
                    <div onClick={()=>toggleTask(t.id)} style={{width:"16px",height:"16px",borderRadius:"50%",
                      flexShrink:0,marginTop:"1px",cursor:"pointer",
                      background:t.done?C.green:"transparent",
                      border:`2px solid ${t.done?C.green:C.border}`,
                      display:"flex",alignItems:"center",justifyContent:"center"}}>
                      {t.done&&<span style={{fontSize:"7px",color:"white",fontWeight:900}}>✓</span>}
                    </div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:"11px",fontWeight:t.done?400:600,color:t.done?C.midGray:C.textDark,
                        textDecoration:t.done?"line-through":"none",lineHeight:1.4,marginBottom:"3px"}}>{t.title}</div>
                      <div style={{display:"flex",alignItems:"center",gap:"5px",flexWrap:"wrap"}}>
                        <span style={{fontSize:"9px",color:C.midGray}}>⏰ {t.time}</span>
                        <span style={{fontSize:"8px",background:t.tagColor+"15",color:t.tagColor,
                          padding:"1px 6px",borderRadius:"20px",fontWeight:700}}>{t.tag}</span>
                        <MsBadge product={t.ms} color={t.ms==="Teams"?C.msTeams:"#2564CF"}/>
                      </div>
                    </div>
                  </div>
                ))}
                <div style={{marginTop:"8px",fontSize:"9px",color:C.midGray,textAlign:"center"}}>Synced via Microsoft Planner + To Do</div>
              </div>

              {/* Meetings — interactive */}
              <div style={{background:"white",borderRadius:"12px",border:`1px solid ${C.border}`,
                padding:"16px",boxShadow:"0 1px 4px rgba(0,0,0,0.04)"}}>
                <div style={{display:"flex",alignItems:"center",gap:"6px",marginBottom:"12px"}}>
                  <span style={{fontSize:"14px"}}>📅</span>
                  <span style={{fontSize:"13px",fontWeight:700,color:C.textDark}}>Today's Meetings</span>
                  <MsBadge product="Teams" color={C.msTeams}/>
                </div>
                {rc.meetings.map((m,i)=>(
                  <div key={i} style={{marginBottom:"8px",borderRadius:"10px",overflow:"hidden",
                    border:`1px solid ${expandedMeeting===i?rc.color:m.done?C.border:rc.color+"35"}`}}>
                    {/* Meeting row */}
                    <div style={{padding:"10px 12px",background:m.done?"#F8F9FA":C.offWhite,
                      display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"}}
                      onClick={()=>setExpandedMeeting(expandedMeeting===i?null:i)}>
                      <div style={{width:"36px",height:"36px",background:m.done?C.border:rc.color+"20",
                        borderRadius:"8px",display:"flex",flexDirection:"column",alignItems:"center",
                        justifyContent:"center",flexShrink:0}}>
                        <span style={{fontSize:"9px",fontWeight:700,color:m.done?C.midGray:rc.color,lineHeight:1}}>{m.time.split(":")[0]}</span>
                        <span style={{fontSize:"7px",color:m.done?C.midGray:rc.color+"90"}}>:{m.time.split(":")[1]}</span>
                      </div>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontSize:"11px",fontWeight:600,color:m.done?C.midGray:C.textDark,
                          textDecoration:m.done?"line-through":"none"}}>{m.title}</div>
                        <div style={{fontSize:"9px",color:C.midGray}}>👥 {m.attendees}</div>
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:"4px"}}>
                        {m.done&&<span style={{fontSize:"8px",background:C.green+"18",color:C.green,padding:"1px 5px",borderRadius:"20px",fontWeight:600}}>Done</span>}
                        <span style={{fontSize:"11px",color:C.midGray,transform:expandedMeeting===i?"rotate(180deg)":"none",transition:"transform 0.2s"}}>▾</span>
                      </div>
                    </div>
                    {/* Expanded panel */}
                    {expandedMeeting===i&&(
                      <div style={{padding:"12px 14px",borderTop:`1px solid ${C.border}`,background:"white"}}>
                        {!meetingSummary[i]?(
                          <div>
                            <div style={{fontSize:"10px",color:C.midGray,marginBottom:"10px",lineHeight:1.4}}>
                              {m.done?"This meeting has ended. Generate a summary to capture actions and decisions.":"Meeting upcoming. Prepare a briefing or review previous notes."}
                            </div>
                            <div style={{display:"flex",gap:"6px",flexWrap:"wrap"}}>
                              {m.done&&(
                                <button onClick={()=>setMeetingSummary(p=>({...p,[i]:MEETING_SUMMARIES[i]||MEETING_SUMMARIES[0]}))}
                                  style={{background:rc.color,color:"white",border:"none",borderRadius:"6px",
                                  padding:"6px 12px",fontSize:"10px",fontWeight:600,cursor:"pointer"}}>
                                  🎙️ Generate summary
                                </button>
                              )}
                              {!m.done&&(
                                <button style={{background:C.blue,color:"white",border:"none",borderRadius:"6px",
                                  padding:"6px 12px",fontSize:"10px",fontWeight:600,cursor:"pointer"}}>
                                  📊 Prepare briefing
                                </button>
                              )}
                              <button style={{background:"white",color:C.textDark,border:`1px solid ${C.border}`,
                                borderRadius:"6px",padding:"6px 12px",fontSize:"10px",cursor:"pointer"}}>
                                📁 View notes
                              </button>
                            </div>
                          </div>
                        ):(
                          <div>
                            <div style={{fontSize:"10px",color:C.midGray,marginBottom:"8px",fontStyle:"italic",lineHeight:1.4}}>{meetingSummary[i].summary}</div>
                            <div style={{marginBottom:"8px"}}>
                              <div style={{fontSize:"9px",fontWeight:700,color:C.textDark,textTransform:"uppercase",letterSpacing:"0.6px",marginBottom:"5px"}}>Actions</div>
                              {meetingSummary[i].actions.map((a,j)=>(
                                <div key={j} style={{fontSize:"10px",color:C.textDark,padding:"3px 0",
                                  borderBottom:`1px solid ${C.border}`,display:"flex",gap:"6px"}}>
                                  <span style={{color:C.coral,flexShrink:0}}>→</span>{a}
                                </div>
                              ))}
                            </div>
                            <div>
                              <div style={{fontSize:"9px",fontWeight:700,color:C.textDark,textTransform:"uppercase",letterSpacing:"0.6px",marginBottom:"5px"}}>Decisions</div>
                              {meetingSummary[i].decisions.map((d,j)=>(
                                <div key={j} style={{fontSize:"10px",color:C.textDark,padding:"3px 0",
                                  borderBottom:`1px solid ${C.border}`,display:"flex",gap:"6px"}}>
                                  <span style={{color:C.green,flexShrink:0}}>✓</span>{d}
                                </div>
                              ))}
                            </div>
                            <button onClick={()=>setMeetingSummary(p=>({...p,[i]:null}))}
                              style={{marginTop:"8px",background:"none",border:"none",fontSize:"9px",color:C.midGray,cursor:"pointer",padding:0}}>
                              Clear summary
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
                <div style={{marginTop:"4px",fontSize:"9px",color:C.midGray,textAlign:"center"}}>Synced from Microsoft Teams Calendar</div>
              </div>
            </div>
          )}

          {/* ── WORK ITEMS ── */}
          {activeTab==="work"&&(
            <WorkItems rc={rc} onLaunchAQW={()=>setShowAQW(true)}/>
          )}

          {/* ── MY READINESS ── */}
          {activeTab==="readiness"&&(
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"14px"}}>

              {/* Left: AI Insights (was Copilot IQ) */}
              <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
                <div style={{background:"white",borderRadius:"12px",border:`1px solid ${C.border}`,
                  padding:"16px",boxShadow:"0 1px 4px rgba(0,0,0,0.04)"}}>
                  <div style={{display:"flex",alignItems:"center",gap:"6px",marginBottom:"12px"}}>
                    <span style={{fontSize:"14px"}}>✦</span>
                    <span style={{fontSize:"13px",fontWeight:700,color:C.textDark}}>My AI Insights</span>
                    <MsBadge product="Viva Insights" color="#8B5CF6"/>
                  </div>
                  {/* Score */}
                  <div style={{display:"flex",alignItems:"center",gap:"14px",marginBottom:"12px",
                    padding:"12px",background:C.offWhite,borderRadius:"10px",border:`1px solid ${C.border}`}}>
                    <div style={{position:"relative",width:"56px",height:"56px",flexShrink:0}}>
                      <svg viewBox="0 0 36 36" style={{width:"56px",height:"56px",transform:"rotate(-90deg)"}}>
                        <circle cx="18" cy="18" r="15.9" fill="none" stroke={C.border} strokeWidth="3"/>
                        <circle cx="18" cy="18" r="15.9" fill="none" stroke={rc.color} strokeWidth="3"
                          strokeDasharray={`${rc.copilotIq.score} 100`} strokeLinecap="round"/>
                      </svg>
                      <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",
                        fontSize:"13px",fontWeight:900,color:rc.color}}>{rc.copilotIq.score}</div>
                    </div>
                    <div>
                      <div style={{fontSize:"13px",fontWeight:700,color:C.textDark}}>{rc.copilotIq.level}</div>
                      <div style={{fontSize:"10px",color:C.midGray,marginBottom:"4px"}}>{rc.copilotIq.trend}</div>
                      <span style={{fontSize:"9px",background:C.green+"18",color:C.green,padding:"2px 8px",borderRadius:"20px",fontWeight:600}}>{rc.copilotIq.badge}</span>
                    </div>
                  </div>
                  {/* Insight metrics */}
                  {[
                    {label:"Time saved this week",value:"4.2 hrs",icon:"⏱️",color:C.blue},
                    {label:"Tasks completed with AI",value:"7 of 12",icon:"✅",color:C.green},
                    {label:"Prompts this month",value:"143",icon:"💬",color:C.purple},
                    {label:"Meetings summarised",value:"6",icon:"📅",color:C.msTeams},
                  ].map((m,i)=>(
                    <div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",
                      padding:"8px 0",borderBottom:`1px solid ${C.border}`}}>
                      <div style={{display:"flex",alignItems:"center",gap:"6px"}}>
                        <span style={{fontSize:"12px"}}>{m.icon}</span>
                        <span style={{fontSize:"11px",color:C.midGray}}>{m.label}</span>
                      </div>
                      <span style={{fontSize:"12px",fontWeight:700,color:m.color}}>{m.value}</span>
                    </div>
                  ))}
                  <div style={{marginTop:"10px",background:"#ECFDF5",borderRadius:"7px",padding:"8px 10px",
                    fontSize:"10px",color:"#065F46",lineHeight:1.4}}>{rc.copilotIq.saved}</div>
                </div>
              </div>

              {/* Right: My Training */}
              <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
                <div style={{background:"white",borderRadius:"12px",border:`1px solid ${C.border}`,
                  padding:"16px",boxShadow:"0 1px 4px rgba(0,0,0,0.04)"}}>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"12px"}}>
                    <div style={{display:"flex",alignItems:"center",gap:"6px"}}>
                      <span style={{fontSize:"14px"}}>🎓</span>
                      <span style={{fontSize:"13px",fontWeight:700,color:C.textDark}}>My Training</span>
                    </div>
                    <MsBadge product="Viva Learning" color="#8B5CF6"/>
                  </div>
                  {[
                    {title:"AI Literacy — EU AI Act Article 4",progress:72,status:"In progress",tag:"Required",tagColor:C.coral,due:"Due Fri"},
                    {title:"Copilot Skills Builder — Policy workflows",progress:45,status:"In progress",tag:"Popular",tagColor:C.blue,due:"Due next week"},
                    {title:"Governance Essentials — NICS AI framework",progress:0,status:"Not started",tag:"New",tagColor:C.purple,due:"No deadline"},
                    {title:"Responsible AI in the Civil Service",progress:100,status:"Complete",tag:"Done",tagColor:C.green,due:"Completed"},
                  ].map((t,i)=>(
                    <div key={i} style={{padding:"10px 0",borderBottom:`1px solid ${C.border}`}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"5px"}}>
                        <span style={{fontSize:"11px",fontWeight:600,color:t.progress===100?C.midGray:C.textDark,
                          textDecoration:t.progress===100?"line-through":"none",lineHeight:1.35,flex:1,paddingRight:"8px"}}>{t.title}</span>
                        <span style={{fontSize:"8px",background:t.tagColor+"15",color:t.tagColor,
                          padding:"2px 6px",borderRadius:"20px",fontWeight:700,flexShrink:0}}>{t.tag}</span>
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
                        <div style={{flex:1,height:"4px",background:C.border,borderRadius:"2px"}}>
                          <div style={{height:"4px",background:t.progress===100?C.green:rc.color,
                            borderRadius:"2px",width:`${t.progress}%`,transition:"width 0.4s"}}/>
                        </div>
                        <span style={{fontSize:"9px",color:C.midGray,flexShrink:0}}>{t.progress}%</span>
                        <span style={{fontSize:"9px",color:t.due.includes("Due")?C.amber:C.midGray,fontWeight:t.due.includes("Due")?600:400,flexShrink:0}}>{t.due}</span>
                      </div>
                    </div>
                  ))}
                  <button style={{marginTop:"10px",width:"100%",background:C.offWhite,border:`1px solid ${C.border}`,
                    borderRadius:"7px",padding:"8px",fontSize:"10px",color:C.blue,fontWeight:600,cursor:"pointer"}}>
                    Browse all training →
                  </button>
                </div>

                {/* Skill progress */}
                <div style={{background:"white",borderRadius:"12px",border:`1px solid ${C.border}`,
                  padding:"16px",boxShadow:"0 1px 4px rgba(0,0,0,0.04)"}}>
                  <div style={{fontSize:"12px",fontWeight:700,color:C.textDark,marginBottom:"10px"}}>Skill Progress</div>
                  {[
                    {skill:"Prompting",score:88,color:C.blue},
                    {skill:"Agent workflows",score:64,color:rc.color},
                    {skill:"Data literacy",score:72,color:C.purple},
                    {skill:"EU AI Act",score:rc.copilotIq.score,color:C.green},
                  ].map((s,i)=>(
                    <div key={i} style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"}}>
                      <span style={{fontSize:"10px",color:C.midGray,width:"100px",flexShrink:0}}>{s.skill}</span>
                      <div style={{flex:1,height:"6px",background:C.border,borderRadius:"3px"}}>
                        <div style={{height:"6px",background:s.color,borderRadius:"3px",width:`${s.score}%`}}/>
                      </div>
                      <span style={{fontSize:"10px",fontWeight:700,color:s.color,width:"28px",textAlign:"right"}}>{s.score}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Top Actions sidebar */}
        {showTopActions&&(
          <div style={{width:"210px",background:"white",borderLeft:`1px solid ${C.border}`,
            display:"flex",flexDirection:"column",flexShrink:0}}>
            <div style={{padding:"12px 14px",borderBottom:`1px solid ${C.border}`,
              display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <span style={{fontSize:"12px",fontWeight:700,color:C.textDark}}>Quick actions</span>
              <button onClick={()=>setShowTopActions(false)} style={{background:"none",border:"none",cursor:"pointer",color:C.midGray,fontSize:"13px",lineHeight:1}}>✕</button>
            </div>

            {/* Urgent from tasks */}
            <div style={{padding:"10px 14px",borderBottom:`1px solid ${C.border}`,background:"#FFF8F8"}}>
              <div style={{fontSize:"9px",fontWeight:700,color:C.coral,textTransform:"uppercase",letterSpacing:"0.6px",marginBottom:"6px"}}>⚡ Urgent today</div>
              {tasks.filter(t=>t.tag==="Urgent"&&!t.done).slice(0,2).map((t,i)=>(
                <div key={i} onClick={()=>(t.ms==="Planner"||t.ms==="To Do")&&setActiveTab("glance")}
                  style={{fontSize:"10px",color:C.textDark,padding:"5px 8px",borderRadius:"6px",
                  background:"white",border:`1px solid ${C.border}`,marginBottom:"4px",cursor:"pointer",lineHeight:1.35}}
                  onMouseEnter={e=>e.currentTarget.style.borderColor=C.coral}
                  onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}>
                  <div style={{fontWeight:600,marginBottom:"2px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{t.title.split("—")[0].trim()}</div>
                  <span style={{fontSize:"9px",color:C.coral}}>⏰ Due {t.time}</span>
                </div>
              ))}
            </div>

            {/* Agent shortcuts */}
            <div style={{padding:"10px 14px",borderBottom:`1px solid ${C.border}`}}>
              <div style={{fontSize:"9px",fontWeight:700,color:C.midGray,textTransform:"uppercase",letterSpacing:"0.6px",marginBottom:"6px"}}>🤖 Launch an agent</div>
              {[
                {label:"AQW Response Agent",    id:"aqw",  icon:"📝", color:C.coral},
                {label:"Civic Insight Agent",   id:"civic",icon:"📊", color:C.nicsGreen},
                {label:"Policy Researcher",     id:"res",  icon:"🔎", color:C.blue},
                {label:"Business Case Support", id:"biz",  icon:"£",  color:C.purple},
              ].map((a,i)=>(
                <div key={i}
                  onClick={()=>{ if(a.id==="aqw") setShowAQW(true); else setActiveTab("work"); }}
                  style={{display:"flex",alignItems:"center",gap:"7px",padding:"7px 8px",
                  borderRadius:"7px",cursor:"pointer",marginBottom:"3px",transition:"all 0.12s"}}
                  onMouseEnter={e=>{e.currentTarget.style.background=a.color+"10";}}
                  onMouseLeave={e=>{e.currentTarget.style.background="transparent";}}>
                  <span style={{fontSize:"13px"}}>{a.icon}</span>
                  <span style={{fontSize:"10px",color:C.textDark,fontWeight:500}}>{a.label}</span>
                  <span style={{marginLeft:"auto",fontSize:"10px",color:a.color,fontWeight:700}}>→</span>
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div style={{padding:"10px 14px",borderBottom:`1px solid ${C.border}`}}>
              <div style={{fontSize:"9px",fontWeight:700,color:C.midGray,textTransform:"uppercase",letterSpacing:"0.6px",marginBottom:"6px"}}>Navigate</div>
              {[
                {label:"Today at a Glance",id:"glance",icon:"☀️"},
                {label:"Work Items",       id:"work",  icon:"🛠️"},
                {label:"My Readiness",     id:"readiness",icon:"📈"},
              ].map((n,i)=>(
                <div key={i} onClick={()=>setActiveTab(n.id)}
                  style={{display:"flex",alignItems:"center",gap:"7px",padding:"6px 8px",
                  borderRadius:"7px",cursor:"pointer",
                  background:activeTab===n.id?C.blue+"10":"transparent",
                  marginBottom:"2px"}}
                  onMouseEnter={e=>{if(activeTab!==n.id)e.currentTarget.style.background=C.offWhite;}}
                  onMouseLeave={e=>{if(activeTab!==n.id)e.currentTarget.style.background="transparent";}}>
                  <span style={{fontSize:"12px"}}>{n.icon}</span>
                  <span style={{fontSize:"10px",fontWeight:activeTab===n.id?700:400,
                    color:activeTab===n.id?C.blue:C.textDark}}>{n.label}</span>
                </div>
              ))}
            </div>

            {/* AI Companion shortcut */}
            <div style={{padding:"10px 14px",flex:1}}>
              <div onClick={()=>setShowAdvisor(true)} style={{background:`linear-gradient(135deg,${C.dark},${C.blue})`,
                borderRadius:"10px",padding:"12px",cursor:"pointer",textAlign:"center"}}>
                <div style={{fontSize:"18px",marginBottom:"4px"}}>🧭</div>
                <div style={{fontSize:"10px",fontWeight:700,color:"white",marginBottom:"2px"}}>
                  {dept?.short||"NICS"} AI Companion
                </div>
                <div style={{fontSize:"9px",color:"rgba(255,255,255,0.6)"}}>Ask me anything</div>
              </div>
            </div>

            <div style={{padding:"10px 14px",borderTop:`1px solid ${C.border}`}}>
              {[["▶","Watch Compass overview"],["💡","Suggest a tool"],["💬","Feedback"]].map(([icon,label])=>(
                <div key={label} style={{display:"flex",alignItems:"center",gap:"7px",marginBottom:"6px",cursor:"pointer"}}
                  onMouseEnter={e=>e.currentTarget.style.opacity="0.7"}
                  onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
                  <div style={{width:"20px",height:"20px",background:C.offWhite,borderRadius:"50%",
                    display:"flex",alignItems:"center",justifyContent:"center",fontSize:"10px"}}>{icon}</div>
                  <span style={{fontSize:"10px",color:C.midGray}}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {showAQW&&<AQWFlow onClose={()=>setShowAQW(false)}/>}
      {showAdvisor&&<AdvisorChat rc={rc} deptName={dept?.short} onClose={()=>setShowAdvisor(false)}/>}
    </div>
  );
}

// ─── Dept + Role selector ─────────────────────────────────────────────────────
function DeptRoleSelect({ onComplete, onHome }) {
  const [dept, setDept] = useState(null);
  const [role, setRole] = useState(null);
  const deptObj = DEPARTMENTS.find(d=>d.id===dept);
  const canGo = dept && role;

  return (
    <div style={{fontFamily:"'Segoe UI',system-ui,sans-serif",minHeight:"100vh",background:"white"}}>
      {/* Header */}
      <div style={{background:C.navy,padding:"13px 24px",display:"flex",alignItems:"center",gap:"12px"}}>
        <div style={{background:"white",borderRadius:"7px",padding:"4px 9px",display:"flex",alignItems:"center"}}>
          <img src={NICS_LOGO} alt="NICS" style={{height:"26px",objectFit:"contain"}}/>
        </div>
        <div style={{width:"1px",height:"24px",background:"rgba(255,255,255,0.18)"}}/>
        <span style={{fontSize:"15px"}}>🧭</span>
        <span style={{fontSize:"13px",fontWeight:700,color:"white"}}>Compass</span>
        <div style={{marginLeft:"auto"}}><HomeBtn onClick={onHome}/></div>
      </div>

      <div style={{maxWidth:"860px",margin:"0 auto",padding:"36px 24px"}}>
        <div style={{textAlign:"center",marginBottom:"36px"}}>
          <div style={{fontSize:"24px",fontWeight:700,color:C.textDark,marginBottom:"6px"}}>Welcome to Compass</div>
          <div style={{fontSize:"14px",color:C.midGray}}>Your AI Companion for the Northern Ireland Civil Service</div>
        </div>

        {/* Steps */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",marginBottom:"32px"}}>
          {["Select your department","Select your role type","Your experience"].map((s,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:"8px"}}>
              <div style={{width:"22px",height:"22px",borderRadius:"50%",
                background:(i===0&&dept)||(i===1&&role)||(i===2&&canGo)?C.blue:i===0?C.blue:C.border,
                color:(i===0&&dept)||(i===1&&role)||(i===2&&canGo)?"white":C.midGray,
                display:"flex",alignItems:"center",justifyContent:"center",fontSize:"10px",fontWeight:700}}>
                {(i===0&&dept)||(i===1&&role)?<span style={{fontSize:"9px"}}>✓</span>:i+1}
              </div>
              <span style={{fontSize:"11px",fontWeight:600,color:((i===0&&dept)||(i===1&&role))?C.blue:C.midGray}}>{s}</span>
              {i<2&&<div style={{width:"28px",height:"1px",background:C.border}}/>}
            </div>
          ))}
        </div>

        {/* Dept grid */}
        <div style={{marginBottom:"28px"}}>
          <div style={{fontSize:"11px",fontWeight:700,color:C.midGray,letterSpacing:"0.8px",textTransform:"uppercase",marginBottom:"10px"}}>Department</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"8px"}}>
            {DEPARTMENTS.map(d=>(
              <div key={d.id} onClick={()=>setDept(d.id)}
                style={{border:`2px solid ${dept===d.id?d.color:C.border}`,borderRadius:"10px",
                padding:"11px 13px",cursor:"pointer",background:dept===d.id?d.color+"08":"white",transition:"all 0.15s"}}
                onMouseEnter={e=>{if(dept!==d.id){e.currentTarget.style.borderColor=d.color+"60";}}}
                onMouseLeave={e=>{if(dept!==d.id){e.currentTarget.style.borderColor=C.border;}}}>
                <div style={{display:"flex",alignItems:"center",gap:"6px",marginBottom:"2px"}}>
                  <div style={{width:"7px",height:"7px",borderRadius:"50%",background:dept===d.id?d.color:C.border,flexShrink:0}}/>
                  <span style={{fontSize:"11px",fontWeight:700,color:dept===d.id?d.color:C.textDark}}>{d.short}</span>
                </div>
                <div style={{fontSize:"9px",color:C.midGray,lineHeight:1.35}}>{d.name}</div>
              </div>
            ))}
          </div>
          {deptObj&&(
            <div style={{marginTop:"8px",background:deptObj.color+"0C",border:`1px solid ${deptObj.color}28`,
              borderRadius:"8px",padding:"9px 13px",fontSize:"11px",color:C.textDark,lineHeight:1.4}}>
              <strong style={{color:deptObj.color}}>{deptObj.short}:</strong> {deptObj.desc}
            </div>
          )}
        </div>

        {/* Role types */}
        <div style={{marginBottom:"28px"}}>
          <div style={{fontSize:"11px",fontWeight:700,color:C.midGray,letterSpacing:"0.8px",textTransform:"uppercase",marginBottom:"10px"}}>Type of Role</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"8px"}}>
            {ROLE_TYPES.map(r=>(
              <div key={r.id} onClick={()=>setRole(r.id)}
                style={{border:`2px solid ${role===r.id?C.blue:C.border}`,borderRadius:"10px",
                padding:"12px 13px",cursor:"pointer",background:role===r.id?"#EEF4FF":"white",transition:"all 0.15s"}}
                onMouseEnter={e=>{if(role!==r.id)e.currentTarget.style.borderColor=C.blue+"50";}}
                onMouseLeave={e=>{if(role!==r.id)e.currentTarget.style.borderColor=C.border;}}>
                <div style={{fontSize:"18px",marginBottom:"5px"}}>{r.icon}</div>
                <div style={{fontSize:"11px",fontWeight:700,color:role===r.id?C.blue:C.textDark,marginBottom:"3px"}}>{r.label}</div>
                <div style={{fontSize:"9px",color:C.midGray,lineHeight:1.35}}>{r.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{textAlign:"center"}}>
          <button onClick={()=>canGo&&onComplete(dept,role)}
            style={{background:canGo?C.blue:"#D1D5DB",color:"white",border:"none",
            borderRadius:"10px",padding:"13px 36px",fontSize:"14px",fontWeight:700,
            cursor:canGo?"pointer":"not-allowed",transition:"all 0.2s",
            boxShadow:canGo?`0 0 24px ${C.blue}40`:"none"}}>
            Configure my Compass experience →
          </button>
          <div style={{marginTop:"9px",fontSize:"10px",color:C.midGray}}>
            {canGo?`${DEPARTMENTS.find(d=>d.id===dept)?.short} · ${ROLE_TYPES.find(r=>r.id===role)?.label}`:"Select a department and role type to continue"}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Landing ──────────────────────────────────────────────────────────────────
function Landing({ onStart }) {
  return (
    <div style={{fontFamily:"'Segoe UI',system-ui,sans-serif",minHeight:"100vh",background:C.navy,
      color:"white",display:"flex",flexDirection:"column"}}>

      {/* Nav */}
      <div style={{display:"flex",alignItems:"center",padding:"14px 28px",borderBottom:"1px solid rgba(255,255,255,0.07)"}}>
        {/* Logo on white pill so it shows correctly against dark background */}
        <div style={{background:"white",borderRadius:"8px",padding:"5px 10px",display:"flex",alignItems:"center"}}>
          <img src={NICS_LOGO} alt="Northern Ireland Civil Service" style={{height:"28px",objectFit:"contain"}}/>
        </div>
        <div style={{width:"1px",height:"26px",background:"rgba(255,255,255,0.15)",margin:"0 16px"}}/>
        <div style={{display:"flex",alignItems:"center",gap:"7px"}}>
          <span style={{fontSize:"17px"}}>🧭</span>
          <div>
            <div style={{fontSize:"15px",fontWeight:700,letterSpacing:"0.2px"}}>Compass</div>
            <div style={{fontSize:"7px",color:"rgba(255,255,255,0.35)",letterSpacing:"1px",textTransform:"uppercase"}}>by Slalom · Microsoft Partner</div>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",
        justifyContent:"center",padding:"48px 28px",textAlign:"center"}}>

        {/* NICS logo centred — white pill background */}
        <div style={{background:"white",borderRadius:"12px",padding:"10px 20px",
          display:"inline-flex",alignItems:"center",marginBottom:"32px",
          boxShadow:"0 4px 20px rgba(0,0,0,0.25)"}}>
          <img src={NICS_LOGO} alt="Northern Ireland Civil Service" style={{height:"44px",objectFit:"contain"}}/>
        </div>

        <div style={{background:"rgba(27,225,242,0.1)",border:"1px solid rgba(27,225,242,0.25)",
          borderRadius:"20px",padding:"5px 16px",fontSize:"9px",color:C.cyan,
          letterSpacing:"1.5px",textTransform:"uppercase",marginBottom:"22px"}}>
          For every civil servant in Northern Ireland
        </div>

        <div style={{fontSize:"clamp(26px,4.5vw,44px)",fontWeight:800,lineHeight:1.15,
          marginBottom:"20px",maxWidth:"680px"}}>
          Here to help, not replace.<br/>
          <span style={{color:C.cyan}}>Your work, made simpler.</span><br/>
          Every role. Every day. Every department.
        </div>

        <div style={{fontSize:"14px",color:"rgba(255,255,255,0.55)",maxWidth:"480px",
          lineHeight:1.8,marginBottom:"36px"}}>
          Compass is your AI colleague for the civil service. It helps you find what you need faster, handles the repetitive parts of your day, and frees you to focus on the work that matters — the judgement, the decisions, the public.
        </div>

        <button onClick={onStart} style={{background:C.blue,color:"white",border:"none",
          borderRadius:"12px",padding:"15px 40px",fontSize:"15px",fontWeight:700,cursor:"pointer",
          boxShadow:`0 0 32px ${C.blue}60`,letterSpacing:"0.2px",marginBottom:"12px"}}>
          Get started →
        </button>
        <div style={{fontSize:"10px",color:"rgba(255,255,255,0.32)"}}>
          Takes 30 seconds to set up. No training required.
        </div>

        {/* Powered by section */}
        <div style={{marginTop:"44px",display:"flex",flexDirection:"column",alignItems:"center",gap:"10px"}}>
          <div style={{fontSize:"9px",color:"rgba(255,255,255,0.3)",letterSpacing:"1.2px",textTransform:"uppercase",fontWeight:600}}>
            Built on tools you already use
          </div>
          <div style={{display:"flex",gap:"5px",flexWrap:"wrap",justifyContent:"center",maxWidth:"480px"}}>
            {[
              {name:"M365 Copilot", icon:"🤖"},
              {name:"Copilot Studio", icon:"🔧"},
              {name:"Teams", icon:"💬"},
              {name:"SharePoint", icon:"📂"},
              {name:"Viva Insights", icon:"📊"},
              {name:"Purview", icon:"🛡️"},
              {name:"Agent 365", icon:"⚡"},
              {name:"Azure AI", icon:"☁️"},
            ].map(({name,icon})=>(
              <div key={name} style={{display:"flex",alignItems:"center",gap:"3px",
                background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",
                borderRadius:"6px",padding:"3px 8px"}}>
                <span style={{fontSize:"9px"}}>{icon}</span>
                <span style={{fontSize:"8px",color:"rgba(255,255,255,0.5)",fontWeight:500}}>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{padding:"13px 28px",borderTop:"1px solid rgba(255,255,255,0.05)",
        display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{fontSize:"9px",color:"rgba(255,255,255,0.2)"}}>© 2026 Slalom. All Rights Reserved. Proprietary and Confidential.</div>
        <div style={{fontSize:"9px",color:"rgba(255,255,255,0.2)"}}>Northern Ireland Civil Service · 2026</div>
      </div>
    </div>
  );
}

// ─── Tour script ──────────────────────────────────────────────────────────────
const TOUR_STEPS = [
  {
    screen:"landing",
    title:"Welcome to Compass",
    sub:"Northern Ireland Civil Service",
    text:"Compass is the AI platform built for every civil servant in Northern Ireland. It works across all nine NICS departments — adapting to your role, your tasks, and your day. Let me show you how it works.",
  },
  {
    screen:"setup-dept",
    title:"Step 1 — Choose your department",
    sub:"9 departments supported",
    text:"Compass configures itself around your department. Every department has its own set of agents, workflows, and tools. For this walkthrough we are selecting the Department for Communities — DfC.",
  },
  {
    screen:"setup-role",
    title:"Step 2 — Choose your role",
    sub:"6 role types available",
    text:"Then select your type of role. Compass builds a personalised experience around it — the right tools, the right agents, the right shortcuts. Here we are selecting Communications Officer.",
  },
  {
    screen:"overview",
    title:"Your Compass — everything configured for you",
    sub:"DfC · Communications Officer",
    text:"Here is everything Compass has ready for this role in DfC. Four AI agents. Meeting tools that generate live summaries. AI Insights tracking time saved. Training tracked against EU AI Act Article 4. And a personal AI Companion on every screen.",
  },
  {
    screen:"dashboard-glance",
    title:"Today at a Glance",
    sub:"Personalised to Esther · DfC",
    text:"This is Esther's personalised dashboard — Communications Officer in DfC. Her urgent tasks are already surfaced: an AQW response due at 17:00 and 1,240 consultation responses to review. Compass knows what matters first.",
  },
  {
    screen:"dashboard-meetings",
    title:"Meetings — interactive summaries",
    sub:"Synced from Microsoft Teams",
    text:"Today's meetings are pulled directly from Teams. Completed meetings show a Generate Summary button — click it and Compass produces an AI summary with actions and decisions extracted automatically.",
  },
  {
    screen:"dashboard-work",
    title:"Work Items — AI Agents",
    sub:"Role-specific agent catalogue",
    text:"Under Work Items, Esther sees every AI agent configured for her role. Each agent has a clear step-by-step flow you can walk through before launching. The AQW Response Agent is live in DfC right now.",
  },
  {
    screen:"dashboard-aqw",
    title:"AQW Response Agent",
    sub:"Live in DfC · Used daily",
    text:"Before writing a single word, the agent checks 1,900 historic Assembly Written Questions for precedent. Consistent position confirmed, draft generated in first-person ministerial tone, governance check passed by Purview.",
  },
  {
    screen:"dashboard-readiness",
    title:"My Readiness — Insights and Training",
    sub:"Viva Insights · Viva Learning",
    text:"Every civil servant can see their AI proficiency score, time saved this week, and training progress — including EU AI Act Article 4 compliance tracked automatically through Viva Insights and Viva Learning.",
  },
  {
    screen:"dashboard-companion",
    title:"DfC AI Companion",
    sub:"Always available · Always contextual",
    text:"The DfC AI Companion is available from every screen. Ask it what to prioritise, how to use an agent, or what the AQW precedent says. It knows the role, the department, and the tools. This is Compass.",
  },
];

// ─── Typewriter hook ──────────────────────────────────────────────────────────
function useTypewriter(text, speed=22) {
  const [out, setOut] = useState("");
  const [done, setDone] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    setOut(""); setDone(false);
    let i = 0;
    clearInterval(ref.current);
    ref.current = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) { setDone(true); clearInterval(ref.current); }
    }, speed);
    return () => clearInterval(ref.current);
  }, [text]);
  return { out, done };
}

// ─── Overview screen ──────────────────────────────────────────────────────────
function Overview({ onContinue, onHome }) {
  const [activeCard, setActiveCard] = useState(null);

  const AGENTS = [
    { id:"aqw",    name:"AQW Response Agent",      icon:"📝", color:C.coral,      tag:"Priority",
      steps:["Receive question","Check 1,900 precedents","Retrieve policy","Generate draft","Governance check","Send for clearance"],
      saves:"~3.5 hrs per AQW" },
    { id:"comms",  name:"Communications Author",    icon:"📣", color:C.green,      tag:"Live",
      steps:["Define audience","Pull guidelines","Generate content","Tone check","Human review","Publish"],
      saves:"~2 hrs per brief" },
    { id:"policy", name:"Policy Researcher Agent",  icon:"🔎", color:C.blue,       tag:"Popular",
      steps:["Define question","Identify sources","Extract evidence","Comparative summary","Briefing note ready"],
      saves:"~50% research time" },
    { id:"civic",  name:"Civic Insight Agent",      icon:"📊", color:C.nicsGreen,  tag:"Active",
      steps:["Upload responses","Ingest & categorise","Extract themes","Human review","Draft report","Publish"],
      saves:"~2–3 weeks per consultation" },
  ];

  const FEATURES = [
    { icon:"📅", label:"Meeting Summaries",     desc:"AI recap of any Teams call — actions, decisions, owners extracted automatically", ms:"Teams" },
    { icon:"📋", label:"Task Management",        desc:"Synced with Planner and To Do — urgent items surfaced to the top of your day", ms:"Planner" },
    { icon:"✦",  label:"My AI Insights",         desc:"Proficiency score, time saved, prompts used, meetings summarised — all visible", ms:"Viva Insights" },
    { icon:"🎓", label:"Training Tracker",        desc:"EU AI Act Article 4, Copilot skills, NICS governance modules — progress tracked", ms:"Viva Learning" },
    { icon:"🛡️", label:"Governance by Default",  desc:"Purview checks every agent output before it goes to clearance — no extra steps", ms:"Purview" },
    { icon:"🧭", label:"AI Companion",            desc:"Ask anything — contextual to your role, department, and today's tasks", ms:"M365 Copilot" },
  ];

  return (
    <div style={{fontFamily:"'Segoe UI',system-ui,sans-serif",minHeight:"100vh",
      background:C.pageBg,display:"flex",flexDirection:"column"}}>

      {/* Header */}
      <div style={{background:"white",borderBottom:`1px solid ${C.border}`,height:"52px",
        display:"flex",alignItems:"center",padding:"0 18px",gap:"12px",flexShrink:0,
        boxShadow:"0 1px 4px rgba(0,0,0,0.04)"}}>
        <img src={NICS_LOGO} alt="NICS" style={{height:"26px",objectFit:"contain"}}/>
        <div style={{width:"1px",height:"22px",background:C.border}}/>
        <span style={{fontSize:"15px"}}>🧭</span>
        <span style={{fontSize:"14px",fontWeight:700,color:C.textDark}}>Compass</span>
        <span style={{fontSize:"8px",background:"#EEF4FF",color:C.blue,padding:"2px 7px",
          borderRadius:"20px",fontWeight:600,border:`1px solid ${C.blue}22`}}>by Slalom</span>
        <div style={{flex:1}}/>
        <div style={{display:"flex",gap:"7px"}}>
          <span style={{fontSize:"9px",background:C.nicsGreen+"18",color:C.nicsGreen,
            padding:"3px 10px",borderRadius:"20px",fontWeight:700}}>DfC</span>
          <span style={{fontSize:"9px",background:"#EEF4FF",color:C.blue,
            padding:"3px 10px",borderRadius:"20px",fontWeight:700}}>Communications Officer</span>
        </div>
        <HomeBtn onClick={onHome}/>
      </div>

      {/* Content */}
      <div style={{flex:1,overflowY:"auto",padding:"20px 24px",maxWidth:"960px",
        margin:"0 auto",width:"100%"}}>

        {/* Intro */}
        <div style={{textAlign:"center",marginBottom:"24px"}}>
          <div style={{fontSize:"20px",fontWeight:700,color:C.textDark,marginBottom:"5px"}}>
            Here is everything Compass has for you
          </div>
          <div style={{fontSize:"13px",color:C.midGray}}>
            Configured for your role · Built on Microsoft 365 · Ready to use today
          </div>
        </div>

        {/* Agents */}
        <div style={{marginBottom:"20px"}}>
          <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"12px"}}>
            <span style={{fontSize:"13px",fontWeight:700,color:C.textDark}}>🤖 Your AI Agents</span>
            <span style={{fontSize:"10px",color:C.midGray}}>Click any card to see the step-by-step flow</span>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"12px"}}>
            {AGENTS.map(a=>(
              <div key={a.id} onClick={()=>setActiveCard(activeCard===a.id?null:a.id)}
                style={{background:"white",borderRadius:"12px",padding:"16px",
                border:`1.5px solid ${activeCard===a.id?a.color:C.border}`,
                cursor:"pointer",transition:"all 0.2s",
                boxShadow:activeCard===a.id?`0 4px 20px ${a.color}18`:"0 1px 4px rgba(0,0,0,0.04)"}}>
                <div style={{display:"flex",justifyContent:"space-between",
                  alignItems:"flex-start",marginBottom:"10px"}}>
                  <div style={{display:"flex",alignItems:"center",gap:"9px"}}>
                    <div style={{width:"36px",height:"36px",background:a.color+"15",
                      borderRadius:"10px",display:"flex",alignItems:"center",
                      justifyContent:"center",fontSize:"18px"}}>{a.icon}</div>
                    <div>
                      <div style={{fontSize:"12px",fontWeight:700,color:C.blue,lineHeight:1.2}}>{a.name}</div>
                      <div style={{fontSize:"9px",color:C.midGray,marginTop:"2px"}}>Saves {a.saves}</div>
                    </div>
                  </div>
                  <span style={{fontSize:"8px",background:a.color+"15",color:a.color,
                    padding:"2px 8px",borderRadius:"20px",fontWeight:700,flexShrink:0}}>{a.tag}</span>
                </div>

                {activeCard!==a.id?(
                  /* Collapsed — dot flow */
                  <div style={{display:"flex",alignItems:"center",gap:"4px",flexWrap:"wrap"}}>
                    {a.steps.map((s,i)=>(
                      <div key={i} style={{display:"flex",alignItems:"center",gap:"3px"}}>
                        <div style={{background:a.color+"15",border:`1px solid ${a.color}30`,
                          borderRadius:"20px",padding:"2px 8px",fontSize:"8px",
                          color:a.color,fontWeight:600,whiteSpace:"nowrap"}}>{s}</div>
                        {i<a.steps.length-1&&(
                          <span style={{fontSize:"9px",color:C.midGray}}>→</span>
                        )}
                      </div>
                    ))}
                  </div>
                ):(
                  /* Expanded — step list */
                  <div>
                    {a.steps.map((s,i)=>(
                      <div key={i} style={{display:"flex",alignItems:"center",gap:"10px",
                        padding:"7px 0",borderBottom:i<a.steps.length-1?`1px solid ${C.border}`:"none"}}>
                        <div style={{width:"22px",height:"22px",borderRadius:"50%",flexShrink:0,
                          background:a.color+"18",border:`1px solid ${a.color}40`,
                          display:"flex",alignItems:"center",justifyContent:"center",
                          fontSize:"9px",fontWeight:700,color:a.color}}>{i+1}</div>
                        <span style={{fontSize:"11px",color:C.textDark,fontWeight:i===0?600:400}}>{s}</span>
                        {i===a.steps.length-1&&(
                          <span style={{marginLeft:"auto",fontSize:"8px",
                            background:C.green+"15",color:C.green,
                            padding:"2px 8px",borderRadius:"20px",fontWeight:600,flexShrink:0}}>✓ Complete</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div style={{marginBottom:"20px"}}>
          <div style={{fontSize:"13px",fontWeight:700,color:C.textDark,marginBottom:"12px"}}>
            ✦ Everything else included
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"10px"}}>
            {FEATURES.map(f=>(
              <div key={f.label} style={{background:"white",borderRadius:"10px",
                padding:"13px 14px",border:`1px solid ${C.border}`,
                boxShadow:"0 1px 4px rgba(0,0,0,0.04)"}}>
                <div style={{display:"flex",alignItems:"center",gap:"7px",marginBottom:"6px"}}>
                  <span style={{fontSize:"16px"}}>{f.icon}</span>
                  <span style={{fontSize:"11px",fontWeight:700,color:C.textDark}}>{f.label}</span>
                </div>
                <div style={{fontSize:"10px",color:C.midGray,lineHeight:1.5,marginBottom:"7px"}}>{f.desc}</div>
                <span style={{fontSize:"8px",background:"#EEF4FF",color:C.blue,
                  padding:"2px 8px",borderRadius:"10px",fontWeight:600}}>● {f.ms}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{background:`linear-gradient(135deg,${C.dark},${C.blue})`,
          borderRadius:"14px",padding:"20px 24px",
          display:"flex",alignItems:"center",justifyContent:"space-between",
          boxShadow:`0 8px 32px ${C.blue}30`}}>
          <div>
            <div style={{fontSize:"16px",fontWeight:700,color:"white",marginBottom:"4px"}}>
              Ready to start
            </div>
            <div style={{fontSize:"11px",color:"rgba(255,255,255,0.6)"}}>
              Everything configured · No setup needed · Built on Microsoft 365
            </div>
          </div>
          <button onClick={onContinue}
            style={{background:"white",color:C.blue,border:"none",borderRadius:"10px",
            padding:"12px 28px",fontSize:"13px",fontWeight:700,cursor:"pointer",
            boxShadow:"0 4px 16px rgba(0,0,0,0.15)",flexShrink:0}}>
            Open my dashboard →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Tour panel ───────────────────────────────────────────────────────────────
function TourPanel({ step, playing, onPlay, onPrev, onNext, onReset, onDismiss, speed, setSpeed }) {
  const tour = TOUR_STEPS[step];
  const { out, done } = useTypewriter(tour.text, 22);
  const progress = ((step + 1) / TOUR_STEPS.length) * 100;

  return (
    <div style={{
      position:"fixed", bottom:0, left:0, right:0,
      background:"white", borderTop:`1px solid ${C.border}`,
      boxShadow:"0 -8px 32px rgba(0,0,0,0.1)",
      zIndex:400,
      fontFamily:"'Segoe UI',system-ui,sans-serif",
    }}>
      {/* Progress bar */}
      <div style={{height:"3px",background:"#E8EDF5"}}>
        <div style={{height:"3px",
          background:`linear-gradient(to right,${C.blue},${C.cyan})`,
          width:`${progress}%`,transition:"width 0.5s ease"}}/>
      </div>

      <div style={{padding:"12px 20px 10px",display:"flex",gap:"14px",alignItems:"flex-start"}}>
        {/* Compass icon */}
        <div style={{flexShrink:0,display:"flex",flexDirection:"column",
          alignItems:"center",gap:"3px"}}>
          <div style={{width:"40px",height:"40px",borderRadius:"12px",
            background:`linear-gradient(135deg,${C.blue},${C.dark})`,
            display:"flex",alignItems:"center",justifyContent:"center",fontSize:"18px",
            boxShadow:`0 3px 12px ${C.blue}40`,
            animation:playing?"tour-spin 10s linear infinite":"none"}}>🧭</div>
          <div style={{fontSize:"8px",color:C.midGray,fontWeight:600,textAlign:"center"}}>
            {step+1}/{TOUR_STEPS.length}
          </div>
        </div>

        {/* Text */}
        <div style={{flex:1,minWidth:0}}>
          <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"4px",flexWrap:"wrap"}}>
            <span style={{fontSize:"12px",fontWeight:700,color:C.textDark}}>{tour.title}</span>
            <span style={{fontSize:"8px",background:C.pageBg,color:C.midGray,
              padding:"2px 8px",borderRadius:"10px",border:`1px solid ${C.border}`}}>{tour.sub}</span>
          </div>
          <div style={{fontSize:"12px",color:"#4A5568",lineHeight:1.65,minHeight:"38px"}}>
            {out}
            {!done&&<span style={{borderRight:`2px solid ${C.blue}`,marginLeft:"1px",
              animation:"tour-blink 0.7s ease infinite"}}>&nbsp;</span>}
          </div>
        </div>

        {/* Controls */}
        <div style={{flexShrink:0,display:"flex",flexDirection:"column",
          gap:"7px",alignItems:"flex-end"}}>
          <div style={{display:"flex",gap:"4px",alignItems:"center"}}>
            <button onClick={onReset}
              title="Restart"
              style={{background:C.pageBg,color:C.midGray,border:"none",
                borderRadius:"6px",padding:"5px 9px",fontSize:"12px",cursor:"pointer"}}>↺</button>
            <button onClick={onPrev} disabled={step===0}
              style={{background:C.pageBg,color:step===0?"#C0C9D8":C.textDark,
                border:"none",borderRadius:"6px",padding:"5px 11px",
                fontSize:"12px",cursor:step===0?"not-allowed":"pointer"}}>←</button>
            <button onClick={onPlay}
              style={{background:playing?"#FFF1F2":C.blue,
                color:playing?"#FF4D5F":"white",
                border:playing?"1px solid #FECDD3":"none",
                borderRadius:"8px",padding:"7px 18px",
                fontSize:"12px",fontWeight:700,cursor:"pointer",minWidth:"82px",
                boxShadow:playing?"none":`0 2px 8px ${C.blue}40`}}>
              {playing?"⏸ Pause":step>=TOUR_STEPS.length-1?"↺ Replay":"▶ Play"}
            </button>
            <button onClick={onNext} disabled={step>=TOUR_STEPS.length-1}
              style={{background:C.pageBg,
                color:step>=TOUR_STEPS.length-1?"#C0C9D8":C.textDark,
                border:"none",borderRadius:"6px",padding:"5px 11px",
                fontSize:"12px",cursor:step>=TOUR_STEPS.length-1?"not-allowed":"pointer"}}>→</button>
            <button onClick={onDismiss}
              title="Close tour"
              style={{background:"none",border:"none",color:C.midGray,
                fontSize:"14px",cursor:"pointer",padding:"4px 6px",marginLeft:"2px"}}>✕</button>
          </div>
          {/* Speed + pace */}
          <div style={{display:"flex",gap:"4px",alignItems:"center"}}>
            <span style={{fontSize:"9px",color:C.midGray}}>Pace:</span>
            {[[3,"Fast"],[5,"Med"],[8,"Slow"]].map(([v,l])=>(
              <button key={v} onClick={()=>setSpeed(v)}
                style={{background:speed===v?"#EEF4FF":"transparent",
                  color:speed===v?C.blue:C.midGray,
                  border:`1px solid ${speed===v?C.blue+"40":C.border}`,
                  borderRadius:"5px",padding:"2px 8px",
                  fontSize:"9px",fontWeight:speed===v?700:400,cursor:"pointer"}}>{l}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Step track */}
      <div style={{padding:"0 20px 10px",display:"flex",gap:"4px"}}>
        {TOUR_STEPS.map((_,i)=>(
          <div key={i}
            style={{flex:1,height:"4px",borderRadius:"2px",
              background:i<step?C.blue:i===step?C.blue:C.border,
              opacity:i<=step?1:0.3,transition:"all 0.3s",
              boxShadow:i===step?`0 0 6px ${C.blue}50`:"none"}}/>
        ))}
      </div>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [view, setView]       = useState("landing");
  const [dept, setDept]       = useState(null);
  const [roleId, setRoleId]   = useState(null);
  // Tour state
  const [tourStep, setTourStep]   = useState(0);
  const [tourOn, setTourOn]       = useState(true);
  const [tourPlaying, setTourPlaying] = useState(false);
  const [tourSpeed, setTourSpeed] = useState(5);
  const tourTimer = useRef(null);

  // Map tour step → which screen/action to show
  const TOUR_NAV = [
    { view:"landing" },
    { view:"setup" },
    { view:"setup" },
    { view:"overview" },
    { view:"dashboard", tab:"glance" },
    { view:"dashboard", tab:"glance" },
    { view:"dashboard", tab:"work" },
    { view:"dashboard", tab:"work" },
    { view:"dashboard", tab:"readiness" },
    { view:"dashboard", tab:"glance", highlight:"companion" },
  ];

  // Advance tour — also navigate the real app
  function goTourStep(i) {
    if (i < 0 || i >= TOUR_STEPS.length) return;
    setTourStep(i);
    const nav = TOUR_NAV[i];
    if (!nav) return;
    if (nav.view === "landing") setView("landing");
    else if (nav.view === "setup") setView("setup");
    else if (nav.view === "overview") setView("overview");
    else if (nav.view === "dashboard") {
      if (view !== "dashboard") {
        // Auto-select DfC + comms if not already set
        if (!dept) setDept("dfc");
        if (!roleId) setRoleId("comms");
        setView("dashboard");
      }
    }
  }

  // Auto-advance timer
  useEffect(() => {
    clearInterval(tourTimer.current);
    if (tourPlaying && tourOn) {
      tourTimer.current = setInterval(() => {
        setTourStep(s => {
          const next = s + 1;
          if (next >= TOUR_STEPS.length) { setTourPlaying(false); return s; }
          goTourStep(next);
          return next;
        });
      }, tourSpeed * 1000);
    }
    return () => clearInterval(tourTimer.current);
  }, [tourPlaying, tourSpeed, tourOn, view, dept, roleId]);

  function onDeptRole(d, r) {
    setDept(d); setRoleId(r);
    setView("overview");
    // Advance tour to overview step if tour is active
    if (tourOn && tourStep <= 3) goTourStep(3);
  }

  function onOverviewContinue() {
    setView("dashboard");
    if (tourOn) goTourStep(4);
  }

  const tourPanel = tourOn ? (
    <TourPanel
      step={tourStep}
      playing={tourPlaying}
      speed={tourSpeed}
      setSpeed={setTourSpeed}
      onPlay={() => {
        if (tourStep >= TOUR_STEPS.length - 1) goTourStep(0);
        setTourPlaying(p => !p);
      }}
      onPrev={() => { setTourPlaying(false); goTourStep(tourStep - 1); }}
      onNext={() => { setTourPlaying(false); goTourStep(tourStep + 1); }}
      onReset={() => { setTourPlaying(false); goTourStep(0); }}
      onDismiss={() => { setTourPlaying(false); setTourOn(false); }}
    />
  ) : (
    <div style={{position:"fixed",bottom:"16px",right:"16px",zIndex:400}}>
      <button onClick={()=>setTourOn(true)}
        style={{background:C.blue,color:"white",border:"none",borderRadius:"10px",
        padding:"8px 16px",fontSize:"11px",fontWeight:700,cursor:"pointer",
        boxShadow:`0 4px 16px ${C.blue}50`,display:"flex",alignItems:"center",gap:"6px"}}>
        🧭 Show tour
      </button>
    </div>
  );

  if (view==="landing") return (
    <>
      <style>{`
        @keyframes tour-blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes tour-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
      `}</style>
      <Landing onStart={()=>{ setView("setup"); if(tourOn) goTourStep(1); }}/>
      {tourPanel}
    </>
  );

  if (view==="setup") return (
    <>
      <style>{`
        @keyframes tour-blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes tour-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
      `}</style>
      <DeptRoleSelect onComplete={onDeptRole} onHome={()=>{ setView("landing"); if(tourOn) goTourStep(0); }}/>
      {tourPanel}
    </>
  );

  if (view==="overview") return (
    <>
      <style>{`
        @keyframes tour-blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes tour-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
      `}</style>
      <Overview onContinue={onOverviewContinue} onHome={()=>{ setView("landing"); if(tourOn) goTourStep(0); }}/>
      {tourPanel}
    </>
  );

  return (
    <>
      <style>{`
        @keyframes tour-blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes tour-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
      `}</style>
      <Dashboard roleId={roleId||"comms"} deptId={dept||"dfc"}
        onHome={()=>{ setView("landing"); if(tourOn) goTourStep(0); }}
        onBack={()=>{ setView("setup"); if(tourOn) goTourStep(1); }}/>
      {tourPanel}
    </>
  );
}
