<script>
	export let segment;
</script>

<style>
	nav {
		position: fixed;
		box-sizing: border-box;
		top: 0;
		left: 0;
		width: 100vw;
		height: 32px;
		padding: 0 40% 0 20%;
	}

	ul {
		margin: 0;
		padding: 0;
		display: flex;
		justify-content: space-between;
	}

	/* clearfix */
	/* ul::after {
		content: '';
		display: block;
		clear: both;
	} */

	li {
		display: block;
		float: left;
	}

	[aria-current] {
		position: relative;
		display: inline-block;
	}

	[aria-current]::after {
		position: absolute;
		content: "";
		width: calc(100% - 1em);
		height: 2px;
		background-color: #ffffff;
		display: block;
		bottom: -1px;
	}

	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
	}

	a.faded {
		color: #909090;
	}
</style>

<nav>
	<ul>
		<li>
			<a
				aria-current={segment === undefined ? 'page' : undefined}
				href=".">home</a>
		</li>
		<li>
			<a
				rel="prefetch"
				aria-current={segment === 'f9' ? 'page' : undefined}
				href="f9">Falcon 9</a>
		</li>
		<li>
			<a
				aria-current={segment === 'fh' ? 'page' : undefined}
				href="fh">Falcon Heavy</a>
		</li>
		<li>
			<a
				aria-current={segment === 'general' ? 'page' : undefined}
				href="general">general</a>
		</li>
		<li>
			<a
				aria-current={segment === 'about' ? 'page' : undefined}
				href="about"
				class="faded">about</a>
		</li>
	</ul>
</nav>
