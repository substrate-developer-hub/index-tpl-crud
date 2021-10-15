import { Command } from 'commander'
import { generateIndex, upsertIndex, rmIndex } from './lib'
import { CliUpsertOptions, CliRmOptions } from './consts_types'

const program = new Command()
program.version('1.0.0')

program
  .command('init <ghRepo> <projectName> [outputPath]')
  .description('initialize an index page')
  .action((ghRepo: string, projectName: string, outputPath: string) => {
    outputPath ||= 'index.html'
    generateIndex(ghRepo, projectName, outputPath)
  })

program
  .command('upsert <inputPath> <ref> [display]')
  .description('upsert a REF into the index page')
  .option('-l, --latest', 'alias this ref as the latest')
  .action((inputPath: string, ref: string, display: string, options: CliUpsertOptions) => {
    display ||= ref
    try {
      upsertIndex(inputPath, ref, display, options)
    } catch (err) {
      console.error(err)
    }
  })

program
  .command('rm <inputPath> <ref>')
  .description('remove a REF from the index page')
  .option('-l, --latest', 'remove the latest alias from this ref if it has one')
  .action((inputPath: string, ref: string, options: CliRmOptions) => {
    try {
      rmIndex(inputPath, ref, options)
    } catch (err) {
      console.error(err)
    }
  })

program.parse(process.argv)
