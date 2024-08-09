import { Controller, Get } from "@nestjs/common";
import { ProjectService } from "src/project/project.service";
import { SkillsService } from "src/skills/skills.service";

@Controller("dashboard")
export class DashboardController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly skillSercive: SkillsService,
  ) {}

  @Get()
  async countAllData() {
    const totalProject = await this.projectService.countAllproject();
    const totalSkill = await this.skillSercive.countData();
    const totalMessage = 45;
    const pieData = await this.skillSercive.dataPieGraph()

    return {
      project: totalProject,
      skill: totalSkill,
      message: totalMessage,
      pieData 
    };
  }


}
