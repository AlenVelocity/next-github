import type { NextApiRequest, NextApiResponse } from 'next'
import { GithubClient } from '../../src/github'
import { Ratings, Card } from '../../src/Card'
const handle = async (req: NextApiRequest, res: NextApiResponse) => {
    if (!req.query.username) return void res.status(400).json({ message: '`username must be provided`' })
    const fubuki = new GithubClient(process.env.GITHUB_ACESS_TOKEN as string)
    const { data } = await fubuki.customQuery<Data>(`query {
        user(login: "${req.query.username}") {
          contributionsCollection {
            totalCommitContributions
            totalIssueContributions
            totalPullRequestContributions
            totalPullRequestReviewContributions
            contributionCalendar {
              totalContributions
              months {
                totalWeeks
              }
              weeks {
                firstDay
                contributionDays {
                  contributionCount
                }
              }
            }
          }
        }
      }`, { username: req.query.username as string })
    if (!data || !data.user) return void res.status(404).json({ message: 'No user found'})
    const { contributionCalendar: contrib } = data.user.contributionsCollection
    const ml = contrib.months.length - 1;
    let mw = contrib.months[ml].totalWeeks;
    let wl = contrib.weeks.length - 1;
    let monthTotal = 0;
    do {
      const weekDays = contrib.weeks[wl].contributionDays;
      const weekDaysLength = weekDays.length - 1;
      for (let x = 0; x <= weekDaysLength; x++) {
        monthTotal += weekDays[x].contributionCount;
      }
      wl--;
      mw--;
    } while (mw > 0)
    const weekDays = contrib.weeks[contrib.weeks.length - 1].contributionDays;
    const weekDaysLength = weekDays.length - 1;
    let weekTotal = 0;
    for (let x = 0; x <= weekDaysLength; x++) weekTotal += weekDays[x].contributionCount
    const ratings = new Ratings(contrib.totalContributions || 0, monthTotal || 0, weekTotal || 0, data?.user.contributionsCollection.totalPullRequestContributions || 0, data?.user.contributionsCollection.totalIssueContributions || 0, data?.user.contributionsCollection.totalPullRequestReviewContributions || 0).calulateRatings()
    const card = new Card(ratings).build()
    res.setHeader('Cache-Control', 'public, max-age=1800');
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(card)
}

export interface Month {
    totalWeeks: number;
}

export interface ContributionDay {
    contributionCount: number;
}

export interface Week {
    firstDay: string;
    contributionDays: ContributionDay[];
}

export interface ContributionCalendar {
    totalContributions: number;
    months: Month[];
    weeks: Week[];
}

export interface ContributionsCollection {
    totalCommitContributions: number;
    totalIssueContributions: number;
    totalPullRequestContributions: number;
    totalPullRequestReviewContributions: number;
    contributionCalendar: ContributionCalendar;
}

export interface User {
    contributionsCollection: ContributionsCollection;
}

export interface Data {
    user: User;
}

export default handle
