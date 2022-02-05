import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import axios from "axios";
import flushPromises from 'flush-promises'
import Validation from '@/components/generic/general-input-validation.vue'
const router = new VueRouter();
const emp_id = window.sessionStorage.setItem("emp_id","1234");
describe('Validation.vue', () => {
	const localVue = createLocalVue();
localVue.use(VueRouter)
  let stub;
  // beforeEach(() => {
  //   });
  //   afterEach(() => {
  //     stub.restore();
  //   });
    it('Check validation for validtitle and whitespace', async () => {
	    const wrapper = shallowMount(Validation, {
	      localVue,
	      propsData:{
	      	inputValue: "sample title",
	      	checkFor: ["validtitle","whitespace"]
	      }
	    });
	    // Condiiton written in reverse, so if valid value it will return false and if invalid value it will return true; 
	    expect(wrapper.vm.hasValidTitle).to.equal(true);
	    await wrapper.setProps({ inputValue: '@@@@' })
	    expect(wrapper.vm.hasValidTitle).to.equal(false);
	    expect(wrapper.vm.errorForDisplay).to.equal("please enter valid name");
	    await wrapper.setProps({ inputValue: " sample title " })
	    expect(wrapper.vm.errorForDisplay).to.equal("should not start/end with whitespaces");

	});

	it('Check validation for minimum characters and numbers', async () => {
	    const wrapper = shallowMount(Validation, {
	      localVue,
	      propsData:{
	      	inputValue: "1234",
	      	checkFor: ["numbers"]
	      }
	    });
	    // Condiiton written in reverse, so if valid value it will return false and if invalid value it will return true; 
	    expect(wrapper.vm.hasNumbers).to.equal(true);
	    await wrapper.setProps({ inputValue: "123456" })
	    expect(wrapper.vm.hasNumbers).to.equal(false);
	    expect(wrapper.vm.errorForDisplay).to.equal("Please provide only 4 digit numbers");
	    await wrapper.setProps({ inputValue: "testing minimum charcaters", checkFor: ["minimumchar"] })
	    expect(wrapper.vm.hasMinimumChar).to.equal(false);
	    expect(wrapper.vm.errorForDisplay).to.equal("description should contain minimum 20 characters");
	    await wrapper.setProps({ inputValue: "testing minimum charcaters for 20 characters", checkFor: ["minimumchar"] })
	    expect(wrapper.vm.hasMinimumChar).to.equal(true);

	});

	it('Check validation for special characters', async () => {
	    const wrapper = shallowMount(Validation, {
	      localVue,
	      propsData:{
	      	inputValue: "testing value",
	      	checkFor: ["specialchars"]
	      }
	    });
	    // Condiiton written in reverse, so if valid value it will return false and if invalid value it will return true; 
	    expect(wrapper.vm.hasSpecialChars).to.equal(false);
	    await wrapper.setProps({ inputValue: "#$@%^" })
	    expect(wrapper.vm.hasSpecialChars).to.equal(true);

	});
})
