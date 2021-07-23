const router = require('express').Router();
const config = require('../config');
const project = require('../models/project');
const Project = require('../models/project');


router.post('/', async(req, res, next) => {
    let project = new Project();
    console.log(req.body)
    project.name = req.body.name;
    // project.name = "abc";
    project.startDate = req.body.startDate;
    project.endDate = req.body.endDate;
    project.teamSize = req.body.teamSize;
    project.budget = req.body.budget;
    project.expense = req.body.expense;
    project.status = req.body.status;

    try {
        project = await project.save();
        res.json({
            success: true,
            data: project
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'the project cannot be created',
            error: error
        })
    }

});
router.get('/', async(req, res, next) => {

    const projects = await Project.find();

    if (!projects) {
        return res.status(500).json({
            success: false,
            message: 'no project existed'
        })
    }
    res.json({
        success: true,
        data: projects
    })

});
router.get('/:id', async(req, res, next) => {

    const project = await Project.findById(req.params.id);

    if (!project) {
        return res.status(500).json({
            success: false,
            message: 'the project with the given id was not found '
        })
    }
    res.json({
        success: true,
        data: project
    })

})
router.put('/:id', async(req, res, next) => {
    const projectExist = await Project.findById(req.params.id);

    if (!projectExist) {
        return res.status(404).json({
            success: false,
            message: 'the project not found',
        });
    }
    let project = {
        name: req.body.name,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        teamSize: req.body.teamSize,
        budget: req.body.budget,
        expense: req.body.expense,
        status: req.body.status,
    }





    try {
        project = await Project.findByIdAndUpdate(req.params.id, project, { new: true });


        res.json({
            success: true,
            data: project
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'the Project cannot be  update ',
            error: error
        });
    }


});
router.delete('/:id', (req, res, next) => {
    Project.findByIdAndRemove(req.params.id).then(project => {
        if (project) {
            return res.status(200).json({
                success: true,
                message: 'the projects is deleted!!'
            })
        } else {
            return res.status(404).json({
                success: false,
                message: 'projects not found',
            });
        }
    }).catch(error => {
        return res.status(500).json({
            success: false,

            error: error
        });
    })



})
module.exports = router;