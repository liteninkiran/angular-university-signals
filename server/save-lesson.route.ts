import { Request, Response } from 'express';
import { COURSES, LESSONS } from './db-data';
import { setTimeout } from 'timers';

export function saveLesson(req: Request, res: Response) {
    const id = +req.params['id'];
    const changes = req.body;

    const newLesson = {
        ...LESSONS[id],
        ...changes,
    };

    LESSONS[id] = newLesson;

    setTimeout(() => {
        res.status(200).json(LESSONS[id]);
    }, 1500);
}
