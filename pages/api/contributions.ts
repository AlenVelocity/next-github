import type { NextApiRequest, NextApiResponse } from 'next'
import { config } from 'dotenv'
import { getContributions } from '../../src/contributions'
import { COLOR_SCHEMES } from '../../src/colours'
config()


const handle = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
    try {
        const { toTerm } = await getContributions(req.query.username as string)
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

export default handle