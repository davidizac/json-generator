import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {ENVIRONMENT,getModelType,CASES} from '../constant';
import axios from 'axios'
import { environment } from 'src/environments/environment';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-json-form',
  templateUrl: './json-form.component.html',
  styleUrls: ['./json-form.component.scss']
})
export class JsonFormComponent implements OnInit {
  private readonly notifier: NotifierService;

  constructor(private formBuilder: FormBuilder,notifierService: NotifierService) { 
    this.notifier = notifierService;
  }

  testForm:FormGroup;
  environment:Array<string>;
  cases:Array<string>;
  models: Array<string>;
  isLoading = false;

  ngOnInit() {
    this.environment = ENVIRONMENT;
    this.cases = CASES;
    this.models = [];
    this.testForm = this.formBuilder.group({
      test_name:['',[Validators.required]],
      environment:['',[Validators.required]],
      first_name: ['',[Validators.required]],
      last_name: ['',[Validators.required]],
      doctor_pass: ['',[Validators.required]],
      doctor_email: ['',[Validators.required,Validators.email]],
      company_id: ['',[Validators.required,Validators.pattern("^[0-9]*$")]],
      lab_name: ['',[Validators.required]],
      case_type: ['',[Validators.required]],
      model_type: ['',[Validators.required]],
      max_attempts:['',[Validators.required, Validators.pattern("^[0-9]*$")]]
    });

    this.onCaseTypeChanges();
  }

  getErrorMessage(field = 'email') {
    if(field === 'email'){
      return this.testForm.controls.doctor_email.hasError('required') ? 'You must enter a value' :
      this.testForm.controls.doctor_email.hasError('email') ? 'Not a valid email' :'';
    }
    return this.testForm.controls[field].hasError('required') ? 'You must enter a value' :
    this.testForm.controls[field].hasError('pattern') ? 'Numbers only' :'';
  }

  onCaseTypeChanges(): void {
    this.testForm.get('case_type').valueChanges.subscribe(val => {
      this.models = getModelType(val);
    });
  }

  createTest(){
    this.isLoading = true;
    return axios.post(`${environment.serverUrl}/api/create`,this.testForm.value)
    .then(()=>{
      this.isLoading = false;
      this.notifier.show({
        message: "Test successfully created!",
        type: "success"
      });    
    })
    .catch(()=> {
      this.isLoading = false;
      this.notifier.show({
        message: "Whoops... Something went wrong",
        type: "error"
      });       
    })
  }

}
