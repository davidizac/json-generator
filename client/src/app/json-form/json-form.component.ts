import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {ENVIRONEMENT,getModelType,CASES} from '../constant';
import axios from 'axios'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-json-form',
  templateUrl: './json-form.component.html',
  styleUrls: ['./json-form.component.scss']
})
export class JsonFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  information:String
  testForm:FormGroup;
  environment:Array<string>;
  cases:Array<string>;
  models: Array<string>;
  isLoading = false;

  ngOnInit() {
    this.environment = ENVIRONEMENT;
    this.cases = CASES;
    this.models = [];
    this.testForm = this.formBuilder.group({
      environment:['',[Validators.required]],
      first_name: ['',[Validators.required]],
      last_name: ['',[Validators.required]],
      doctor_pass: ['',[Validators.required]],
      doctor_email: ['',[Validators.required,Validators.email]],
      company_id: ['',[Validators.required]],
      lab_name: ['',[Validators.required]],
      case_type: ['',[Validators.required]],
      model_type: ['',[Validators.required]]
    });

    this.onCaseTypeChanges();
  }

  getErrorMessage() {
    return this.testForm.controls.doctor_email.hasError('required') ? 'You must enter a value' :
    this.testForm.controls.doctor_email.hasError('email') ? 'Not a valid email' :
            '';
  }

  onCaseTypeChanges(): void {
    this.testForm.get('case_type').valueChanges.subscribe(val => {
      this.models = getModelType(val);
    });
  }

  createTest(){
    this.isLoading = true;
    return axios.post(`${environment.serverUrl}/api/send-json`,this.testForm.value)
    .then(()=>{
      this.isLoading = false;
      this.information = 'Test Successfully created'
    })
    .catch(()=> {
      this.isLoading = false;
      this.information = 'Whoops... Somethings went wrongs'
    })
  }

}
