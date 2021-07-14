import { getColorScheme, rgb } from './colours'
import github from './github'

interface ContributionDay {
    contributionCount: number
    contributionLevel: ContributionLevelName
    date: string
    color: string
}

export enum CONTRIBUTION_LEVELS {
    'NONE' = 0,
    'FIRST_QUARTILE' = 1,
    'SECOND_QUARTILE' = 2,
    'THIRD_QUARTILE' = 3,
    'FOURTH_QUARTILE' = 4
}
const LEVELS = Object.keys(CONTRIBUTION_LEVELS)
export type ContributionLevelName = keyof typeof CONTRIBUTION_LEVELS

export const isValidContributionLevelName = (name?: string): name is ContributionLevelName =>
    !!name && LEVELS.includes(name)

export const getContributions = async (username: string) => {
    if (!username) {
        throw new Error('Missing required arguments')
    }

    const { contributions: contributionCalendar } = await github()(username)

    if (!contributionCalendar || !contributionCalendar['weeks'] || !contributionCalendar['totalContributions']) {
        throw new Error('Could not get contributions data')
    }

    const { weeks, totalContributions } = contributionCalendar

    const contributions = (weeks as { contributionDays: ContributionDay[] }[]).map((week) => week.contributionDays)

    const moreContributedDay = (a: ContributionDay, b: ContributionDay) =>
        a.contributionCount > b.contributionCount ? a : b

    const maxContributionDay = contributions.reduce(
        (max, week) =>
            moreContributedDay(
                max,
                week.reduce((maxInWeek, current) => moreContributedDay(maxInWeek, current), week[0])
            ),
        contributions[0][0]
    )

    const totalMsg = `${totalContributions} contributions in the last year\n`

    const toTerm = ({ noTotal = false, noLegend = false, scheme = 'github', pixel = '■' } = {}) => {
        const colorScheme = getColorScheme(scheme)

        const total = !noTotal ? totalMsg : ''

        const legend = !noLegend
            ? ' '.repeat(contributions.length - 15) +
              'Less ' +
              colorScheme.hexNumColors.map((color) => rgb(pixel, color)).join('') +
              ' More\n'
            : ''

        const grass = (day?: ContributionDay) =>
            day?.contributionLevel ? rgb(pixel, colorScheme.getByLevel(day?.contributionLevel)) : ''

        return (
            total +
            contributions[0].reduce(
                (acc, _, i) => acc + contributions.map((row) => grass(row[i])).join('') + '\n',
                ''
            ) +
            legend
        )
    }

    return {
        contributions,
        totalContributions,
        maxContributionDay,
        toTerm
    }
}
