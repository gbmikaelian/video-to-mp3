import Controller from './Controller';
import { Track } from '../models';
import path from 'path';
import youtubeDl from 'youtube-dl';

export default class VideoController extends Controller {
    constructor () {
        super(arguments);
        this.trackFolder = '../tracks';
    }

    getTracks = async (req, res) => {
        try {
            const tracks = await Track.find();
            res.set({ 'Content-Disposition': 'inline' });
            return res.json({ success: true, response: tracks });
        } catch (e) {
            return res.json({ success: false, response: e });
        }
    };

    cutFilename = (filename) => {
        return filename[4].replace('[ffmpeg] Destination: ', '');
    };

    downloadMp3 = (url) => {
        return new Promise((resolve, reject) => {
            const pathToSave = path.resolve(__dirname, this.trackFolder);
            youtubeDl.exec(url, ['-x', '--audio-format', 'mp3'], { cwd: pathToSave }, function (err, response) {
                if (err) reject(err);
                resolve(response);
            });
        });
    }

    convertVideo = async ({ body }, res) => {
        try {
            const response = await this.downloadMp3(body.url);
            const video = new Track({
                trackName: this.cutFilename(response)
            });
            video.save();
            return res.json({ success: true, response: video });
        } catch (e) {
            console.log(e.message);
            return res.json({ success: false, error: e.message });
        }
    }
}