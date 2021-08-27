import Ratings from './Ratings'
import styles from './styles'
const octicons = require('@primer/octicons')
import {
    cardBackgroundTemplate,
    ratingGraphTemplate,
    titleTemplate,
    commitsTemplate,
    pullRequestsTemplate,
    issuesTemplate,
    codeReviewTemplate
} from './templates'
export default class Card {
    styles: () => string
    constructor(public ratings: Ratings) {
        this.styles = () => styles(this.ratings.getColor() as string, this.ratings.getProgress() as string)
    }

    build = () => `
    <svg width="328" height="${240}" viewBox="0 0 328 ${240}" xmlns="http://www.w3.org/2000/svg">
      ${this.styles()}
      ${cardBackgroundTemplate()}
      
      ${ratingGraphTemplate(this.ratings.getLetterSign() as string)}
      
      ${titleTemplate(octicons['mark-github'].heights[16].path)}
      ${commitsTemplate(octicons['git-commit'].heights[16].path, {
          year: Math.round(this.ratings.thisYearCommits / this.ratings.metrics.THIS_YEAR_COMMITS),
          month: Math.round(this.ratings.thisMonthCommits / this.ratings.metrics.THIS_MONTH_COMMITS),
          week: Math.round(this.ratings.thisWeekCommits / this.ratings.metrics.THIS_WEEK_COMMITS)
      })}
      ${pullRequestsTemplate(octicons['git-pull-request'].heights[16].path, this.ratings.pullRequests)}
      ${issuesTemplate(octicons['bug'].heights[16].path, parseInt(this.ratings.issues / this.ratings.metrics.ISSUES))}
      ${codeReviewTemplate(
          octicons['code-review'].heights[16].path,
          Math.round(this.ratings.codeReviews / this.ratings.metrics.ISSUES)
      )}    
    </svg>
  `
}
