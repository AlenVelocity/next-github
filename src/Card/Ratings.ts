/*
 * Orginally authored by Joshua Clifford Reyes <reyesjoshuaclifford@gmail.com>
 */
import { mean, standardNormalDistribution } from './Math'
import scores from './scores'
export default class Ratings {
    scores: {
        id: string
        max: number
        min: number
        letterSign: string
        text: string
        color: string
        progress: string
    }[]

    metrics: {
        SIGMA: number
        THIS_YEAR_COMMITS: number
        THIS_MONTH_COMMITS: number
        THIS_WEEK_COMMITS: number
        PULL_REQUESTS: number
        ISSUES: number
        CODE_REVIEWS: number
    }

    private ratings: Partial<typeof scores[0]>

    final = 0

    constructor(
        public thisYearCommits = 0,
        public thisMonthCommits = 0,
        public thisWeekCommits = 0,
        public pullRequests = 0,
        public issues = 0,
        public codeReviews = 0,
        public overallScores = 0
    ) {
        //sort and assigin scores to this.scores from most to least
        this.scores = scores
        this.metrics = {
            SIGMA: 450,
            THIS_YEAR_COMMITS: 0.6,
            THIS_MONTH_COMMITS: 0.8,
            THIS_WEEK_COMMITS: 1,
            PULL_REQUESTS: 2,
            ISSUES: 2,
            CODE_REVIEWS: 2
        }
        this.ratings = {
            letterSign: '',
            color: '',
            progress: ''
        }
        this.thisYearCommits = thisYearCommits * this.metrics.THIS_YEAR_COMMITS
        this.thisMonthCommits = thisMonthCommits * this.metrics.THIS_MONTH_COMMITS
        this.thisWeekCommits = thisWeekCommits * this.metrics.THIS_WEEK_COMMITS
        this.pullRequests = pullRequests * this.metrics.PULL_REQUESTS
        this.issues = issues * this.metrics.ISSUES
        this.codeReviews = codeReviews * this.metrics.CODE_REVIEWS
        this.overallScores = overallScores
    }

    getLetterSign = () => this.ratings.letterSign
    getColor = () => this.ratings.color
    getProgress = () => this.ratings.progress

    calulateRatings = () => {
        const total =
            this.thisYearCommits +
            this.thisMonthCommits +
            this.thisWeekCommits +
            this.pullRequests +
            this.issues +
            this.codeReviews
        const m = mean([
            this.thisYearCommits,
            this.thisMonthCommits,
            this.thisWeekCommits,
            this.pullRequests,
            this.issues,
            this.codeReviews
        ])

        const score = (total - m) / this.metrics.SIGMA
        if (total !== 0) this.overallScores = Math.round(standardNormalDistribution(score) * 100)
        console.log(this.overallScores, m, total, score)
        for (let x = 0; x < this.scores.length; x++) {
            if (this.overallScores <= this.scores[x].max && this.overallScores >= this.scores[x].min) {
                this.ratings = this.scores[x]
                break
            }
        }
        return this
    }

    getRatings = () => this.ratings
}
