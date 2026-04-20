const sequelize = require('./db');
const { User, Project, Task } = require('./models');

const seed = async () => {
  try {
    await sequelize.sync({ force: true });

    // Create Users sample data created by AI
    const user1 = await User.create({
      name: 'John Doe',
      email: 'john@example.com'
    });

    const user2 = await User.create({
      name: 'Jane Smith',
      email: 'jane@example.com'
    });

    // Create Projects (linked to users)
    const project1 = await Project.create({
      name: 'Website Redesign',
      userId: user1.id
    });

    const project2 = await Project.create({
      name: 'Mobile App',
      userId: user2.id
    });

    // Create Tasks (linked to projects)
    await Task.bulkCreate([
      {
        title: 'Create wireframes',
        completed: false,
        projectId: project1.id
      },
      {
        title: 'Build homepage',
        completed: true,
        projectId: project1.id
      },
      {
        title: 'Design UI',
        completed: false,
        projectId: project2.id
      },
      {
        title: 'Set up backend',
        completed: false,
        projectId: project2.id
      }
    ]);

    console.log('Database seeded successfully!');
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

seed();