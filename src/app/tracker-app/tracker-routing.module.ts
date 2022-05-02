import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigComponent } from './config/config.component';
import { TrackerAppComponent } from './tracker-app/tracker-app.component';
import { StatsComponent } from './stats/stats.component';

const routes: Routes = [
    {
		path: '',
		component: TrackerAppComponent

	},
	{
		path: 'tracker',
		component: TrackerAppComponent

	},
    {
        path: 'stats',
        component: StatsComponent
    },
    {
        path: 'config',
        component: ConfigComponent
    }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class TrackerRoutingModule {}
