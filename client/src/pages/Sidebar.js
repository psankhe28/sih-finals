import { faChartPie, faHandHoldingUsd, faCog } from '@fortawesome/free-solid-svg-icons';

export const StudentNav = [
  { title: "Profile", link: "/student/profile", icon: faCog },
  { title: "Schemes", link: "/student/schemes", icon: faChartPie },
  { title: "Applied Schemes", link: "/student/applied-schemes", icon: faHandHoldingUsd },
  { title: "NS Id", link: "/student/nsid", icon: faCog },
  { title: "Logout", link: "/", icon: faCog },
];

export const StateNav = [
  { title: "Schemes", link: "/state/view-schemes", icon: faCog },
  { title: "Accepted Applicants", link: "/state/accepted-applicants", icon: faCog },
  { title: "Pending Applicants", link: "/state/pending-applicants", icon: faCog },
  { title: "Logout", link: "/", icon: faCog },
];

export const InstituteNav = [
  { title: "Verified Applicants", link: "/institute/accepted-applicants", icon: faCog },
  { title: "Pending Applicants", link: "/institute/pending-applicants", icon: faCog },
  { title: "Logout", link: "/", icon: faCog },
];
