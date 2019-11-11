# User Interface and BFF for the K Container shipment solution

This repository includes the user interface in Angular as Single Page Application and the BFF in nodejs to present the container shipment demonstration. It uses the different simulator microservices and functions to support the end to end demonstration. This project is part of the Container shipment reference implementation as presented in [this project](https://github.com/ibm-cloud-architecture/refarch-kc).

You can read the content using the [book view](http://ibm-cloud-architecture.github.io/refarch-kc-ui).

## Build and Run

The `scripts` folder has two scripts to build the UI, and a docker image for the server and single page app, and run it locally. You should clone all the KC solution repositories and use each component one by one, or use our IBM public cloud deployment. To be able to run the UI locally, you need to have at least the following component up and running:

* Kafka and zookeeper: Use the docker compose file in the root project:
 ```
 cd ../refarch-kc/docker
 docker-compose -f backbone-compose.yml up
 ```
* Start the Fleet simulator.  For the fleet simulator [see instructions here](https://github.com/ibm-cloud-architecture/refarch-kc-ms/tree/master/fleet-ms#run) to run the simulator locally.

* Make sure you have the angular cli installed via `npm install -g @angular/cli` and run an initial `npm install` inside the ui folder to pull all dependencies.

* Build UI and server and a docker image with the command: `./scripts/build.sh`. The trace looks like:
> .... chunk {main} main.js, main.js.map (main) 78.9 kB [initial] [rendered]
chunk {polyfills} polyfills.js, polyfills.js.map (polyfills) 223 kB [initial] [rendered]
chunk {runtime} runtime.js, runtime.js.map (runtime) 6.08 kB [entry] [rendered]
chunk {styles} styles.js, styles.js.map (styles) 387 kB [initial] [rendered]
chunk {vendor} vendor.js, vendor.js.map (vendor) 6.81 MB [initial] [rendered]
...
> kcbff@0.0.1 copy-deps /Users/jeromeboyer/Code/GreenCompute/refarch-kc-ui/server
> cpx "../ui/dist/ui/*.*" ./dist/server/static && cpx "./config/config.json" ./dist/server/config
Successfully built 0226a1748fd9
Successfully tagged ibmcase/kcontainer-ui:latest

* Start locally with `./script/run.sh` or with a docker `./script/runDocker.sh`.

* Use your web browser at http://localhost:3000/#/home



### Building this booklet locally

The content of this repository is written with markdown files, packaged with [MkDocs](https://www.mkdocs.org/) and can be built into a book-readable format by MkDocs build processes.

1. Install MkDocs locally following the [official documentation instructions](https://www.mkdocs.org/#installation).
1. Install Material plugin for mkdocs:  `pip install mkdocs-material`
2. `git clone https://github.com/ibm-cloud-architecture/refarch-kc-ui.git` _(or your forked repository if you plan to edit)_
3. `cd refarch-kc-ui`
4. `mkdocs serve`
5. Go to `http://127.0.0.1:8000/` in your browser.

### Pushing the book to GitHub Pages

1. Ensure that all your local changes to the `master` branch have been committed and pushed to the remote repository.
   1. `git push origin master`
2. Ensure that you have the latest commits to the `gh-pages` branch, so you can get others' updates.
	```bash
	git checkout gh-pages
	git pull origin gh-pages

	git checkout master
	```
3. Run `mkdocs gh-deploy` from the root refarch-kc directory.

---

## Contribute

As this implementation solution is part of the Event Driven architeture reference architecture, the [contribution policies](./CONTRIBUTING.md) apply the same way here.

**Contributors:**
* [Jerome Boyer](https://www.linkedin.com/in/jeromeboyer/)
* [Hemankita Perabathini](https://www.linkedin.com/in/hemankita-perabathini/)

Please [contact me](mailto:boyerje@us.ibm.com) for any questions.
