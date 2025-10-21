import fs from 'fs'
import path from 'path'

const __dirname = path.dirname(new URL(import.meta.url).pathname)
const srcDir = path.join(__dirname, 'by-gameset')
const destFile = path.join(__dirname, 'legacy-boxpresets.min.json')

const bundledPresets: Record<string, any> = {}

for (const file of fs.readdirSync(srcDir)) {
  if (file.endsWith('.json')) {
    const data = fs.readFileSync(path.join(srcDir, file), 'utf8')
    const json = JSON.parse(data)
    bundledPresets[file.replace('.json', '')] = json
  }
}

fs.writeFileSync(destFile, JSON.stringify(bundledPresets))
console.log(`Bundled ${Object.keys(bundledPresets).length} presets into ${destFile}`)
