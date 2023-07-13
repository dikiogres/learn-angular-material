import {Component} from '@angular/core';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {MatCalendarCellClassFunction} from '@angular/material/datepicker';

const SAMPLE_TEXT="Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque doloribus quo libero officiis eligendi minus tempore ipsa, excepturi vel, tenetur doloremque dolore culpa! Quidem, similique. Vitae, corporis assumenda excepturi, laboriosam quod unde sequi fugit aliquid quibusdam aliquam maxime accusamus cum eum, necessitatibus repellat voluptatem dolorem. Minus dolorem quo minima necessitatibus ut magni, quia temporibus, modi impedit quam deleniti, dolores esse quas tempore est obcaecati facere vel nemo illum ullam. Tempora voluptatibus atque voluptate in delectus et consequatur porro placeat perferendis esse iusto, magni possimus earum? Rerum iure enim, non vero beatae neque cum, minus maxime ullam voluptatum, distinctio autem possimus."

@Component({
  selector: "create-course-step-1",
  templateUrl:"create-course-step-1.component.html",
  styleUrls: ["create-course-step-1.component.scss"]
})
export class CreateCourseStep1Component {

  form = this.fb.group({
    title: ['', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(60)
    ]],
    releasedAt: [new Date(), Validators.required],
    category: ['BEGINNER', Validators.required],
    courseType: ['premium', Validators.required],
    downloadsAllowed: [false, Validators.requiredTrue],
    longDescription: [SAMPLE_TEXT, [Validators.required, Validators.minLength(3)]]
  });

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    const date = cellDate.getDate();
    if(view=='month') {
      return (date === 1 ) ? 'highlight-date' : '';
    }
    return "";
  }

  constructor(private fb: UntypedFormBuilder) {

  }

  get courseTitle() {
    return this.form.controls['title'];
  }

}
