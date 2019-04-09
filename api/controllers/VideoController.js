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
            const tracks = await Track.find().sort('-createdAt');
            return res.json({ success: true, response: tracks });
        } catch (e) {
            return res.json({ success: false, response: e });
        }
    };

    changeFormat = (filename) => {
        let format = filename.split('.');
        format = format[format.length - 1];
        return filename.replace(format, 'mp3');
    };

    downloadMp3 = (url) => {
        return new Promise((resolve, reject) => {
            const pathToSave = path.resolve(__dirname, this.trackFolder);
            youtubeDl.getInfo(url, (err, info) => {
                if (err) reject(err);
                    youtubeDl.exec(url, ['-x', '--audio-format', 'mp3'], { cwd: pathToSave }, (err) => {
                        if (err) reject(err);
                        resolve(info);
                    });
            });
        });
    }

    convertVideo = async ({ body }, res) => {
        try {
            const response = await this.downloadMp3(body.url);
            const video = new Track({
                trackName: this.changeFormat(response._filename)
            });
            video.save();
            return res.json({ success: true, response: video });
        } catch (e) {
            console.log(e.message);
            return res.json({ success: false, error: e.message });
        }
    }
}