import { Router } from 'express';
import { VideoController } from '../controllers';

const router = new Router();

const videoController = new VideoController();
router.post('/convert-video', videoController.convertVideo);
router.get('/tracks', videoController.getTracks);

export default router;