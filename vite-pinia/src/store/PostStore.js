import { defineStore } from 'pinia';
import axios from 'axios'

export const PostStore = defineStore({
    id: "post",
    state : () => ({
        posts : [],
        // id : null,
        edit_id : null,
        projectcode : null,
        facilitycode : null,
        projectname : null,
        clientname : null,
        facilityname : null,
        plantname : null,
        creoprojectcode : null,
        componentlibrary : null,

        loading:false,
    }),

    getters: {

    },

    actions:{
        async fetchPosts(){
            console.log("hello");
            this.posts = [];
            this.loading = true
            try{
                let posts = await axios.get('http://localhost:7000/api/employee/');
                console.log("hello");
                this.posts = posts.data;
            }catch(error){
                console.log(error)
            }finally{
                //loader
                this.loading = false
            }
        // }
    },
    addItem(){
        console.log("hii");
        if(this.projectcode != '' && this.facilitycode != '' && this.projectname != '' && this.clientname != '' && this.facilityname != '' 
        && this.plantname != '' && this.creoprojectcode != '' && this.componentlibrary != ''){
        
            console.log("hii");
            let form_data = new FormData();
            form_data.append('projectcode', this.projectcode);
            form_data.append('facilitycode', this.facilitycode);
            form_data.append('clientname', this.clientname);
            form_data.append('facilityname', this.facilityname);
            form_data.append('plantname', this.plantname);
            form_data.append('creoprojectcode', this.creoprojectcode);
            form_data.append('projectname', this.projectname);
            form_data.append('componentlibrary', this.componentlibrary)
            // form_data.append('image', this.image);

            // let config  = {
            //     header:{
            //         'Content-Type' : 'image/png'
            //     }
            // }
            if(this.edit_id > 0){
                //Update
                form_data.append('_method','put');
                // let form_data = {
                //     projectcode: this.projectcode,
                //     facilitycode: this.facilitycode,
                //     clientname: this.clientname,
                //     facilityname: this.facilityname,
                //     plantname: this.plantname,
                //     creoprojectcode: this.creoprojectcode,
                //     projectname: this.projectname,
                //     componentlibrary: this.componentlibrary
                // };
                console.log("hii");
                axios.post('http://localhost:7000/api/employee/' + this.edit_id,form_data).then(res=>{
                    console.log("hii");
                    console.log(res);
                    this.formReset()
                    this.fetchPosts()
                })
            }else{
                //add Post
                console.log("hii");
                axios.post('http://localhost:7000/api/employee/', form_data).then(res =>{
                    console.log("hii");
                    console.log(res);
                    this.formReset()
                    this.fetchPosts()
                })
            }
        }
    },
    editItem(id){
        //Let = let
        let post = this.posts.find(post=>post.id == id)
        if(post){
            this.projectcode= post.projectcode
            this.facilitycode= post.facilitycode
            this.clientname= post.clientname
            this.facilityname= post.facilityname
            this.plantname= post.plantname
            this.creoprojectcode= post.creoprojectcode
            this.projectname= post.projectname
            this.componentlibrary= post.componentlibrary
            this.edit_id= post.id

    }},

        formReset(){
            this.edit_id = null
            this.projectcode = null
            this.facilitycode = null
            this.clientname = null
            this.facilityname = null
            this.plantname = null
            this.creoprojectcode = null
            this.projectname = null
            this.componentlibrary = null
        }
    }
})

