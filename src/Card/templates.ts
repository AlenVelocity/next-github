import { shortNumberDenomination } from './Math'

export const cardBackgroundTemplate = () => `
<rect x="0.5" y="0.5" rx="5" width="327" height="100%" fill="#efefef" stroke="#e1e4e8" />
`

export const ratingGraphTemplate = (letter: string) => `
<g id="ratings" transform="translate(265, 115)">
  <circle class="rating-circle-stroke" cx="-10" cy="8" r="38" />
  <circle class="rating-circle" cx="-10" cy="8" r="38" />
  <text class="rating-letter-sign" x="-5" y="1.5" text-anchor="middle" alignment-baseline="central" dominant-baseline="central">${letter}</text>
</g>
`

export const titleTemplate = (icon: string) => `
<svg>
<g class="item" style="animation-delay: 2{}00ms" transform="translate(33, 19.8)">
    ${icon}
</g>
<text class="title" x="54" y="35">
 Contribution Stats
 </text>
 </svg>
`

export const commitsTemplate = (icon: string, { year, month, week }: { year: number; month: number; week: number }) => `
<svg x="30" y="50">
  <g class="item" style="animation-delay: 2{}00ms" transform="translate(3, 2)">
    ${icon}
  </g>
  <g class="stagger" style="animation-delay: 200ms" transform="translate(25, 15)">
    <text class="contribution-stats" x="0" y="0">Commits:</text>
  </g>
</svg>
<svg x="35" y="75">
  <g id="this_year_commits" class="item" style="animation-delay: 400ms" transform="translate(25, 15)">
    <text class="contribution-stats" x="0" y="0">This Year:</text>
    <text class="contribution-stats bolder" x="101" y="0">${shortNumberDenomination(year, 2)}</text>
  </g>
  <g id="this_month_commits" class="item" style="animation-delay: 600ms" transform="translate(25, 35)">
    <text class="contribution-stats" x="0" y="5">This Month:</text>
    <text class="contribution-stats bolder" x="101" y="5">${shortNumberDenomination(month, 2)}</text>
  </g>
  <g id="this_week_commits" class="item" style="animation-delay: 800ms" transform="translate(25, 55)">
    <text class="contribution-stats" x="0" y="10">This Week:</text>
    <text class="contribution-stats bolder" x="101" y="10">${shortNumberDenomination(week, 2)}</text>
  </g>
</svg>
`

export const pullRequestsTemplate = (icon: string, prs: number) => `
<svg x="30" y="150">
  <g class="item" style="animation-delay: 1000ms" transform="translate(3, 2)">
    ${icon}
  </g>
  <g id="pull_requests" class="item" style="animation-delay: 1000ms" transform="translate(25, 15)">
    <text class="contribution-stats" x="0" y="0">Pull Requests:</text>
    <text class="contribution-stats bolder" x="106" y="0">${shortNumberDenomination(prs, 2)}</text>
  </g>
</svg>
`

export const issuesTemplate = (icon: string, issues: number) => `
<svg x="30" y="175">
  <g class="item" style="animation-delay: 1200ms" transform="translate(3, 2)">
    ${icon}
  </g>
  <g id="issues" class="item" style="animation-delay: 1200ms" transform="translate(25, 15)">
    <text class="contribution-stats" x="0" y="0">Issues:</text>
    <text class="contribution-stats bolder" x="106" y="0">${shortNumberDenomination(issues, 2)}</text>
  </g>
</svg>
`

export const codeReviewTemplate = (icon: string, reviews: number) => `
<svg x="30" y="200">
  <g class="item" style="animation-delay: 1400ms" transform="translate(3, 2)">
    ${icon}
  </g>
  <g id="code_reviews" class="item" style="animation-delay: 1400ms" transform="translate(25, 15)">
    <text class="contribution-stats" x="0" y="0">Code Reviews:</text>
    <text class="contribution-stats bolder" x="106" y="0">${shortNumberDenomination(reviews, 2)}</text>
  </g>
</svg>
`
