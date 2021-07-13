import type { NextApiRequest, NextApiResponse } from 'next'
import { config } from 'dotenv'
import github from '../../src/github'
import { getContributions } from '../../src/contributions'
import { COLOR_SCHEMES } from '../../src/colours'
config()


const handle = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (typeof req.query.username !== 'string') return void res.status(400).json({ message: '`username` must be specified'})
  const stats = github()
  try {
    if (req.query.type === 'terminal') {
      try {
        const { toTerm } = await getContributions(req.query.username)
        return void res.status(200).send(toTerm({
          noTotal: req.query.noTotal === 'true',
          noLegend: req.query.legend === 'false',
          scheme: Object.keys(COLOR_SCHEMES).includes(req.query.scheme as string) ? req.query.scheme as string : 'github',
          pixel: req.query.pixel as string || '■'
        }))
      } catch(err) {
        return void res.status(400).json((err as Error).message)
      }
    }
    const data = await stats(req.query.username as string)
    res.status(200).json(data)
  } catch(err) {
    return void res.status(404).json({ message: 'user not found'})
  }
}

export default handle