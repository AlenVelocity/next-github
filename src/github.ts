import { GithubClient } from 'fubuki'

const github = () => {
    const fubuki = new GithubClient(process.env.GITHUB_ACESS_TOKEN as string)
    return async (username: string) => {
        const [user, contributions] = await Promise.all([
            fubuki.getUser(username),
            fubuki.getContributionsCalender(username)
        ])
        return {
            user,
            contributions
        }
    }
}
export default github
export { GithubClient }
