import { faChartPie, faHandHoldingUsd, faCog } from '@fortawesome/free-solid-svg-icons';

export const StudentNav = [
  { title: "Dashboard", link: "/student", icon: faChartPie },
  { title: "Schemes", link: "/student/schemes", icon: faChartPie },
  { title: "Applied Schemes", link: "/student/applied-schemes", icon: faHandHoldingUsd },
  { title: "Documents", link: "/student/documents", icon: faCog },
  { title: "Profile", link: "/student/profile", icon: faCog },
];

export const StateNav = [
  { title: "Dashboard", link: "/state", icon: faChartPie },
  { title: "Schemes", link: "/state/view-schemes", icon: faCog },
  { title: "Accepted Applicants", link: "/state/accepted-applicants", icon: faCog },
  { title: "Pending Applicants", link: "/state/pending-applicants", icon: faCog },
];

export const InstituteNav = [
  { title: "Dashboard", link: "/institute", icon: faChartPie },
  { title: "Applicants", link: "/institute/applicants", icon: faChartPie },
  { title: "Verified Applicants", link: "/institute/accepted", icon: faCog },
  { title: "Pending Applicants", link: "/institute/pending", icon: faCog }
];
