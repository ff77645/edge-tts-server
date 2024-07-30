import fs from "fs"
import path from "path"
import { execSync } from "child_process"
import { innerVoices } from "./voice"

const publicPath = path.resolve("public")
const audioPath = path.join(publicPath, "a")

export const generateTTS = (text: string, voice: string,rate:any = 1) => {
    if (!fs.existsSync(publicPath)) {
        fs.mkdirSync(publicPath)
    }

    if (!fs.existsSync(audioPath)) {
        fs.mkdirSync(audioPath)
    }

    const f_name = `${Date.now()}.mp3`
    const subtitle_name = `${Date.now()}.vtt`

    if (!innerVoices.includes(voice)) {
        throw new Error("Invalid voice")
    }

    const _rate = ((rate - 1) * 100).toFixed(0) + '%'

    execSync(
        `edge-tts --rate=${_rate} --voice ${voice} --text "${text}" --write-media ${path.join(
            audioPath,
            f_name
        )} --write-subtitles ${path.join(
            audioPath,
            subtitle_name
        )}`
    )

    // return `/a/${f_name}`
    return {
        media:`/a/${f_name}`,
        subtitles:`/a/${subtitle_name}`,
    }
}
