// d45180e2-9585-4989-9df6-e4d087b42466


(function (root, factory) {
    if (typeof exports === 'object' && typeof module !== 'undefined') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define(['exports'], function (exports) {
            (root.NeutrinoEffect = exports)['Frame_stars'] = factory();
        });
    } else {
        var namespace = (root.NeutrinoEffect || (root.NeutrinoEffect = {}));
        namespace.__last__ = namespace['Frame_stars'] = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {

function Frame_stars(ctx) {
	var Db = this;

	var ne = function (Ld, Bd) {
		this.Ld = Ld;
		this.Bd = Bd;

		if (this.Bd.we.pe.length > 0) {
			this.we = this.Bd.we.pe[0];

			this.Lc = [ne.prototype.Ec,
				ne.prototype.Fc][this.we.xe];
		}
		else
			this.we = null;
	}

	ne.prototype = {
		Ec: function (fe, Ab, Xb) {
			var Gc = ctx.ib(Xb.Md);
			var Hc = Math.cos(Gc);
			var Ic = Math.sin(Gc);
			var ye = ctx.Ae(Xb.Nd[0]);
			var ze = ctx.Ae(Xb.Nd[1]);
			fe./**/transform(ye * Hc, ye * Ic, ze * -Ic, ze * Hc, Ab[0], Ab[1]);
		},

		Fc: function (fe, Ab, Xb) {
			var q = Xb.Mc;
			var z2 = 2.0 * q[2] * q[2];
			var xy = 2.0 * q[0] * q[1];
			var wz = 2.0 * q[3] * q[2];
			var ye = ctx.Ae(Xb.Nd[0]);
			var ze = ctx.Ae(Xb.Nd[1]);
			fe./**/transform(
				ye * (1.0 - 2.0 * q[1] * q[1] - z2),
				ye * (xy + wz),
				ze * (wz - xy),
				ze * (2.0 * q[0] * q[0] + z2 - 1.0),
				Ab[0], Ab[1]);
		},

		Pc: function (fe, Xb, ge) {
			Xb.vc(fe, -1, ge);

			if (this.we) {

				if (this.Be != null && !Xb.oc) {

					if (Xb.Od > 0.001) {
						var De = Math.floor(Xb.Qc % this.we.Rc);
						var Ee = Math.floor(Xb.Qc / this.we.Rc);

						var Ab = Xb.Ab.slice();
						var Nd = Xb.Nd.slice();
						if (!ge || ge./**/transform(Ab, Nd)) {

							var df = Math.abs(Nd[0]);
							var ef = Math.abs(Nd[1]);

							if (df > 0.001 && ef > 0.001) {
								fe.save();
								this.Lc(fe, Ab, Xb);

								fe.translate(-df * Xb.Pd[0], -ef * (1 - Xb.Pd[1]));
								fe.globalAlpha *= Xb.Od;

								if (Xb.gf[0] < 0.999 || Xb.gf[1] < 0.999 || Xb.gf[2] < 0.999) {
									if (df >= 1 && ef >= 1) {
										var Ye = df < this.Tc ? df : this.Tc;
										var Ze = ef < this.Uc ? ef : this.Uc;

										ctx.af(Ye, Ze);

										ctx.bf.globalCompositeOperation = "copy";
										ctx.bf.drawImage(this.Be.image,
											this.Be.x + this.Tc * De, this.Be.y + this.Uc * Ee,
											this.Tc, this.Uc,
											0, 0, Ye, Ze);

										ctx.bf.globalCompositeOperation = "multiply";
										ctx.bf.fillStyle = ctx.ff(Xb.gf);
										ctx.bf.fillRect(0, 0, Ye, Ze);

										ctx.bf.globalCompositeOperation = "destination-atop";
										ctx.bf.drawImage(this.Be.image,
											this.Be.x + this.Tc * De, this.Be.y + this.Uc * Ee,
											this.Tc, this.Uc,
											0, 0, Ye, Ze);

										fe.drawImage(ctx.cf, 0, 0, Ye, Ze, 0, 0, df, ef);
									}
								}
								else {
									fe.drawImage(this.Be.image,
										this.Be.x + this.Tc * De, this.Be.y + this.Uc * Ee,
										this.Tc, this.Uc, 0, 0, df, ef);
								}

								fe.restore();
							}
						}
					}
				}
			}

			Xb.vc(fe, 1, ge);
		},

		Hd: function (fe, ge) {
			fe.save();

			if (this.we) {
				fe.globalCompositeOperation = this.Ld.materials[this.Ld./**/model.renderStyles[this.we.renderStyleIndex].materialIndex];
				this.Be = this.Ld.textureDescs[this.Ld./**/model.renderStyles[this.we.renderStyleIndex].textureIndices[0]];
			}
			else {
				this.Be = null;
			}

			if (this.Be) {
				this.Tc = this.Be.width / this.we.Rc;
				this.Uc = this.Be.height / this.we.Sc;
			}

			function kd(a, b) {
				if (a.Ab[2] > b.Ab[2])
					return 1;
				if (a.Ab[2] < b.Ab[2])
					return -1;
				return 0;
			}

			switch (this.Bd.Vc) {
				case 0:
					for (var Wb = 0; Wb < this.Bd.tc.length; ++Wb) {
						this.Pc(fe, this.Bd.tc[Wb], ge);
					}
					break;
				case 1:
					for (var Wb = this.Bd.tc.length; Wb-- > 0;) {
						this.Pc(fe, this.Bd.tc[Wb], ge);
					}
					break;
				case 2:
					this.Bd.tc.sort(kd);

					for (var Wb = 0; Wb < this.Bd.tc.length; ++Wb) {
						this.Pc(fe, this.Bd.tc[Wb], ge);
					}
					break;
			}

			fe.restore();
		}
	}

	var oe = function (Ld, Bd) {

		this.Ld = Ld;
		this.Bd = Bd;

		if (this.Bd.we.pe.length > 0)
			this.we = this.Bd.we.pe[0];
		else
			this.we = null;

		this.vertex = [
			{ /**/position: [0.0, 0.0, 0.0], /**/color: [0, 0, 0, 0], /**/texCoords: [[0.0, 0.0]] },
			{ /**/position: [0.0, 0.0, 0.0], /**/color: [0, 0, 0, 0], /**/texCoords: [[0.0, 0.0]] },
			{ /**/position: [0.0, 0.0, 0.0], /**/color: [0, 0, 0, 0], /**/texCoords: [[0.0, 0.0]] },
			{ /**/position: [0.0, 0.0, 0.0], /**/color: [0, 0, 0, 0], /**/texCoords: [[0.0, 0.0]] }];
	}

	oe.prototype = {
		qe: function (Xb, se, re, te, renderBuffer) {
			Xb.Ce(-1, se, re, te, renderBuffer);

			if (this.we) {

				if (!Xb.oc) {

					var v0 = this.vertex[0];
					var v1 = this.vertex[1];
					var v2 = this.vertex[2];
					var v3 = this.vertex[3];

					var Fe = [], Ge = [];

					if (this.we.xe == 0) {
						var a = ctx.ib(Xb.Md);
						var s = -Math.sin(a);
						var c = Math.cos(a);

						Fe[0] = se[0] * c + re[0] * s;
						Fe[1] = se[1] * c + re[1] * s;
						Fe[2] = se[2] * c + re[2] * s;

						Ge[0] = -se[0] * s + re[0] * c;
						Ge[1] = -se[1] * s + re[1] * c;
						Ge[2] = -se[2] * s + re[2] * c;
					}
					else {
						var q = Xb.Mc;
						var z2 = 2.0 * q[2] * q[2];
						var xy = 2.0 * q[0] * q[1];
						var wz = 2.0 * q[3] * q[2];

						Fe[0] = 1.0 - 2.0 * q[1] * q[1] - z2;
						Fe[1] = xy + wz;
						Fe[2] = 2.0 * q[0] * q[2] - 2.0 * q[3] * q[1];

						Ge[0] = xy - wz;
						Ge[1] = 1.0 - 2.0 * q[0] * q[0] - z2;
						Ge[2] = 2.0 * q[1] * q[2] + 2.0 * q[3] * q[0];
					}

					var He = [], Ie = [], Je = [], Ke = [];
					ctx.u(He, Fe, -Xb.Nd[0] * Xb.Pd[0]);
					ctx.u(Ie, Fe, Xb.Nd[0] * (1.0 - Xb.Pd[0]));
					ctx.u(Je, Ge, -Xb.Nd[1] * Xb.Pd[1]);
					ctx.u(Ke, Ge, Xb.Nd[1] * (1.0 - Xb.Pd[1]));

					ctx.c(v0./**/position, He, Je);
					ctx.c(v0./**/position, v0./**/position, Xb.Ab);
					ctx.c(v1./**/position, He, Ke);
					ctx.c(v1./**/position, v1./**/position, Xb.Ab);
					ctx.c(v2./**/position, Ie, Ke);
					ctx.c(v2./**/position, v2./**/position, Xb.Ab);
					ctx.c(v3./**/position, Ie, Je);
					ctx.c(v3./**/position, v3./**/position, Xb.Ab);

					{
						var rgb = ctx.v(Xb.gf, 255);
						v0./**/color = v1./**/color = v2./**/color = v3./**/color = [rgb[0], rgb[1], rgb[2], Xb.Od * 255];
					}

					{
						var De = Math.floor(Xb.Qc % this.we.Rc);
						var Ee = Math.floor(Xb.Qc / this.we.Rc);

						var Pe, Qe, Re, Se;

						var We = this.Ld.texturesRemap[this.Ld./**/model.renderStyles[this.we.renderStyleIndex].textureIndices[0]];
						if (We) {
							var Ue = We.width / this.we.Rc;
							var Ve = We.height / this.we.Sc;

							var Pe = We.x + De * Ue;
							var Qe = Pe + Ue;
							var Re = (We.y + We.height - Ee * Ve);
							var Se = Re - Ve;
						} else {
							var Ue = 1.0 / this.we.Rc;
							var Ve = 1.0 / this.we.Sc;

							var Pe = De * Ue;
							var Qe = Pe + Ue;
							var Re = (1.0 - Ee * Ve);
							var Se = Re - Ve;
						}

						v0./**/texCoords[0] = [Pe, Se];
						v1./**/texCoords[0] = [Pe, Re];
						v2./**/texCoords[0] = [Qe, Re];
						v3./**/texCoords[0] = [Qe, Se];
					}

					if (renderBuffer.beforeQuad) {
						renderBuffer.beforeQuad(this.we.renderStyleIndex);
					}

					renderBuffer.pushVertex(v0);
					renderBuffer.pushVertex(v1);
					renderBuffer.pushVertex(v2);
					renderBuffer.pushVertex(v3);

					if (!renderBuffer.__lastRenderCall) {
						renderBuffer.__lastRenderCall = new ctx.RenderCall(0, 6, this.we.renderStyleIndex);
					} else {
						var lastRenderCall = renderBuffer.__lastRenderCall;

						if (lastRenderCall.renderStyleIndex == this.we.renderStyleIndex) {
							lastRenderCall.numIndices += 6;
						} else {
							renderBuffer.pushRenderCall(lastRenderCall);
							renderBuffer.__lastRenderCall = new ctx.RenderCall(
								lastRenderCall.startIndex + lastRenderCall.numIndices,
								6, this.we.renderStyleIndex);
						}
					}
				}
			}

			Xb.Ce(1, se, re, te, renderBuffer);
		},

		ue: function (se, re, te, renderBuffer) {
			switch (this.Bd.Vc) {
				case 0:
					for (var Wb = 0; Wb < this.Bd.tc.length; ++Wb) {
						this.qe(this.Bd.tc[Wb], se, re, te, renderBuffer);
					}
					break;

				case 1:
					for (var Wb = this.Bd.tc.length; Wb-- > 0;) {
						this.qe(this.Bd.tc[Wb], se, re, te, renderBuffer);
					}
					break;

				case 2:
					this.Bd.tc.forEach(function (Xb) {
						Xb.depth = ctx.H(te, Xb.Ab);
					});

					this.Bd.tc.sort(function (a, b) {
						if (a.depth < b.depth)
							return 1;
						if (a.depth > b.depth)
							return -1;
						return 0;
					});

					this.Bd.tc.forEach(function (Xb) {
						this.qe(Xb, se, re, te, renderBuffer);
					}, this);
					break;
			}
		}
	}

	var ld = function (Ld, we, ve) {
		var Vb = this;
		this.Ld = Ld;
		this.we = we;

		// Eb

		function Eb() {
			this.Fb = 0;
			this.Gb = 1;
			this.Hb = null;
			this.Ib = null;
			this.Kb = 0;
			this.Lb = 1;

			Vb.we.Mb(this); // IMPL

			this.Nb = function () {
				this.Ob = this.Gb;
				this.Fb = 0;
			}

			this.Nb();
		}

		Eb.prototype = {
			Jd: function () {
				this.Nb();
			},

			Id: function (Qb, Ab, Mc) {
				Vb.we.Pb(Qb, Vb, this); // IMPL

				var Rb = Vb.Rb;
				var systemTime = Ld.Rb;
				var Sb = Qb;
				var ic = 0;

				if (this.zb > 0.000001) {

					var Tb = this.Ob + Qb * this.zb;

					while (Tb >= 1.0) {
						var Ub = this.zb < 0.001 ? 0.0 : (1.0 - this.Ob) / this.zb;
						Sb -= Ub;
						Rb += Ub;
						systemTime += Ub;

						if (this.Hb != null && Rb > this.Hb) {
							Vb.disactivate();
							break;
						}

						Vb.Rb = Rb;
						Ld.Rb = systemTime;

						if (Ab && Qb > 0)
							ctx.ab(Vb.Ab, Ab, Vb.Bb, Sb / Qb);

						if (Mc && Qb > 0)
							ctx.slerpq(Vb.Mc, Mc, Vb.prevRotation, Sb / Qb);

						// for the future when Jb would be external
						this.Lb = this.Jb;

						for (var Wb = 0; Wb < this.Jb; ++Wb) {
							if (Vb.sc.length == 0)
								break;

							if (this.Jb == 1)
								this.Kb = 0;
							else
								this.Kb = Wb / (this.Jb - 1);

							var Xb = Vb.sc.pop();
							Vb.tc.unshift(Xb);

							if (Wb == 0)
								Xb.Yb();
							else
								Xb.Zb();

							Xb.Id(Sb);
							++ic;
						}

						this.Ob = 0.0;
						Tb -= 1.0;

						if (this.Ib != null && ++this.Fb >= this.Ib) {
							Vb.disactivate();
							break;
						}
					}

					this.Ob = Tb;
				}
				Rb += Sb;
				Vb.Rb = Rb;

				if (Ab)
					ctx.T(Vb.Ab, Ab);

				if (Mc)
					ctx.U(Vb.Mc, Mc);

				return ic;
			}
		}

		// ac

		function ac() {
			this.Gb = 1;
			this.Kb = 0;
			this.Lb = 1;

			Vb.we.Mb(this); // IMPL

			this.Nb = function () {
				this.bc = this.Gb;
			}

			this.Nb();
		}

		ac.prototype = {
			Jd: function () {
				this.Nb();
			},

			Id: function (Qb, Ab, Mc) {
				Vb.we.Pb(Qb, Vb, this); // IMPL

				var cc = Vb.Rb;
				var dc = cc + Qb;
				var systemTimeBeforeFrame = Ld.Rb;
				var systemTimeAfterFrame = systemTimeBeforeFrame + Qb;
				var ec = Ab ? ctx.O(ctx.h(Ab, Vb.Bb)) : 0;
				var ic = 0;

				if (ec > 0.000001) {
					var fc = ec / this.rd;
					var Tb = this.bc + fc;

					var hc = fc < 0.001 ?
						1.0 - this.bc : (1.0 - this.bc) / fc;

					var jc = [];

					while (Tb > 1.0) {
						var kc = cc + hc * Qb;

						if (Ab)
							ctx.ab(jc, Vb.Bb, Ab, hc);

						Vb.Rb = kc;
						ctx.T(Vb.Ab, jc);
						Ld.Rb = ctx.X(systemTimeBeforeFrame, systemTimeAfterFrame, hc);

						// for the future when Jb would be external
						this.Lb = this.Jb;

						for (var Wb = 0; Wb < this.Jb; ++Wb) {
							if (Vb.sc.length == 0)
								break;

							if (this.Jb == 1)
								this.Kb = 0;
							else
								this.Kb = Wb / (this.Jb - 1);

							var Xb = Vb.sc.pop();
							Vb.tc.unshift(Xb);

							if (Wb == 0)
								Xb.Yb();
							else
								Xb.Zb();

							Xb.Id(Qb * (1.0 - hc));
							++ic;
						}

						hc += 1.0 / fc;
						Tb -= 1.0;
					}

					this.bc = Tb;
				}

				Vb.Rb = dc;

				if (Ab)
					ctx.T(Vb.Ab, Ab);

				if (Mc)
					ctx.U(Vb.Mc, Mc);

				return ic;
			}
		}

		// mc

		function mc() {
			this.Ab = [];
			this.Pd = [];
			this.Nd = [];
			this.gf = [];
			this.Kc = [];
		}

		mc.prototype = {
			nc: function () {
				this.oc = false;

				for (var i = 0; i < this.Kc.length; ++i) {
					var pc = this.Kc[i];
					pc.Bd.Jd(this.Ab, null);

					if (pc.Ad.sd)
						pc.Bd.disactivate();
				}
			},

			Yb: function () {
				Vb.we.fd(Vb, this); // IMPL
				this.nc();
			},

			Zb: function () {
				Vb.we.gd(Vb, this); // IMPL
				this.nc();
			},

			Id: function (Qb) {
				Vb.we.qc(Qb, Vb, this); // IMPL

				this.rc(Qb);
			},

			pc: function (je) {
				return this.Kc[je].Bd;
			},

			rc: function (Qb) {
				for (var i = 0; i < this.Kc.length; i++) {
					this.Kc[i].Bd.Id(Qb, this.Ab, null);
				}
			},

			uc: function (md, nd) {
				this.Kc.push({
					Bd: new ld(Ld, md, ve),
					Ad: nd
				});
			},

			vc: function (fe, xc, ge) {
				for (var i = 0; i < this.Kc.length; ++i) {
					var pc = this.Kc[i];

					if (xc == pc.Ad.xc)
						pc.Bd.Hd(fe, ge);
				}
			},

			Ce: function (xc, se, re, te, renderBuffer) {
				for (var i = 0; i < this.Kc.length; ++i) {
					var pc = this.Kc[i];

					if (xc == pc.Ad.xc)
						pc.Bd.ue(se, re, te, renderBuffer);
				}
			},

			wc: function (fe) {
				this.oc = true;
				for (var i = 0; i < this.Kc.length; ++i) {
					var pc = this.Kc[i];

					if (pc.Ad.sd) {
						pc.Bd.activate();
						pc.Bd.Id(0);
					}
					else
						pc.Bd.disactivate();
				}
			},

			yc: function (Gd) {
				for (var i = 0; i < this.Kc.length; ++i) {
					this.Kc[i].Bd.Ed(Gd);
				}
			}
		}

		// zc

		function zc() {
		}

		zc.prototype.Ac = function (Xb) {
			return Vb.we.Cc(Vb, Xb, this); // IMPL
		}

		// ld Ad

		this.Ab = [];
		this.Bb = [];
		this.Mc = [];
		this.prevRotation = [];
		this.tc = [];
		this.sc = [];
		this.Wc = new zc();
		this.construct = new ve(this.Ld, this);
		this.Yc = [];
		this.ad = [];

		this.dd = function () {
			this.vd = new Eb();
		}

		this.ed = function () {
			this.vd = new ac();
		}

		this.we.ud(this); // IMPL

		for (var Wb = 0; Wb < this.jd; ++Wb) {
			var Xb = new mc();

			for (var id = 0; id < this.Yc.length; ++id) {
				var hd = this.Yc[id];
				Xb.uc(hd.Db, hd.Ad);
			}

			this.sc.push(Xb);
		}

		this.Nb = function (Ab, Mc) {

			ctx.T(this.Ab, Ab ? Ab : [0, 0, 0]);
			ctx.T(this.Bb, this.Ab);
			ctx.U(this.Mc, Mc ? Mc : [0, 0, 0, 1]);
			ctx.U(this.prevRotation, this.Mc);

			this.Rb = 0.0;
			this.wd = 0.0;
			this.Zc = true;
			this.paused_ = false;
			this.generatorsPaused_ = false;
			ctx.W(this.ad, 0, 0, 0);
		}
	}

	ld.prototype.Jd = function (Ab, Mc) {
		this.Nb(Ab, Mc);

		this.sc.push.apply(this.sc, this.tc);
		this.tc.length = 0;

		this.vd.Jd();
	}

	ld.prototype.Id = function (Qb, Ab, Mc) {

		if (this.paused_)
		{
			this.Td(Ab, Mc);
			return;
		}

		this.wd = this.Rb;

		if (Ab) {
			ctx.T(this.Bb, this.Ab);
			if (Qb > 0.0001) {
				var shift = [];
				ctx.g(shift, Ab, this.Bb);
				ctx.T(this.ad, shift);
				ctx.w(this.ad, this.ad, Qb);
			}
			else {
				ctx.W(this.ad, 0, 0, 0);
			}
		}
		else {
			ctx.W(this.ad, 0, 0, 0);
		}

		if (Mc)
		{
			ctx.U(this.prevRotation, this.Mc);
		}

		var ic;

		if (this.Zc && !this.generatorsPaused_) {
			ic = this.vd.Id(Qb, Ab, Mc);
		}
		else {
			if (Ab)
				ctx.T(this.Ab, Ab);

			if (Mc)
				ctx.U(this.Mc, Mc);

			ic = 0;
			this.Rb += Qb;
		}

		for (var Wb = ic; Wb < this.tc.length;) {
			var Xb = this.tc[Wb];

			if (!Xb.oc) {
				Xb.Id(Qb);

				if (this.Wc.Ac(this.tc[Wb])) {
					Xb.wc();

					if (this.xd(Wb))
						continue;
				}
			}
			else {
				Xb.rc(Qb);

				if (this.xd(Wb))
					continue;
			}

			++Wb;
		}
	};

	ld.prototype.xd = function (je) {
		var Xb = this.tc[je];

		var ready = true;

		for (var id = 0; id < Xb.Kc.length; ++id) {
			var Bd = Xb.Kc[id].Bd;

			if (Bd.activated() || Bd.tc.length > 0) {
				ready = false;
				break;
			}
		}

		if (ready) {
			this.sc.push(this.tc[je]);
			this.tc.splice(je, 1);
			return true;
		}

		return false;
	}

	ld.prototype.Hd = function (fe, ge) {
		this.construct.Hd(fe, ge);
	}

	ld.prototype.ue = function (se, re, te, renderBuffer) {
		this.construct.ue(se, re, te, renderBuffer);
	}

	ld.prototype.Td = function (Ab, Mc) {
		this.wd = this.Rb;

		if (Ab) {
			ctx.T(this.Bb, this.Ab);
			ctx.T(this.Ab, Ab);
		}

		if (Mc) {
			ctx.U(this.prevRotation, this.Mc);
			ctx.U(this.Mc, Mc);
		}
	}

	ld.prototype.uc = function (md, nd) {
		this.Yc.push({ Db: md, Ad: nd });
	}

	ld.prototype./**/pause = function () {
		this.paused_ = true;
	}

	ld.prototype./**/unpause = function () {
		this.paused_ = false;
	}

	ld.prototype./**/paused = function () {
		return this.paused_;
	}

	ld.prototype./**/pauseGenerators = function () {
		this.generatorsPaused_ = true;
	}

	ld.prototype./**/unpauseGenerators = function () {
		this.generatorsPaused_ = false;
	}

	ld.prototype./**/generatorsPaused = function () {
		return this.generatorsPaused_;
	}

	ld.prototype.activate = function () {
		this.Zc = true;
	}

	ld.prototype.disactivate = function () {
		this.Zc = false;
	}

	ld.prototype.activated = function () {
		return this.Zc;
	}

	ld.prototype./**/getNumParticles = function () {
		return this.tc.length;
	}

	var ke = function () {
		var Cb = this;

		this._init = function (we, Ab, Mc, ve, options) {
			this./**/model = we;

			this.Ab = [];
			this.Mc = [];

			// ke Ad

			this.od = [];

			this.pd = function (md) {
				var Bd = new ld(this, md, ve);
				Bd.Nb(this.Ab, this.Mc);
				this["_".concat(md.name)] = Bd;
				this.od.push(Bd);
			}

			this.Nb = function (Ab, Mc) {
				this.Cd = 0.0;
				this.Rb = 0.0;
				ctx.T(this.Ab, Ab ? Ab : [0, 0, 0]);
				ctx.U(this.Mc, Mc ? Mc : [0, 0, 0, 1]);
			}

			this.Nb(Ab, Mc);
			this./**/model.qd(this); // IMPL

			this._presimNeeded = true;

			if (options.generatorsPaused) {
				this./**/pauseGeneratorsInAllEmitters();
			}

			if (options.paused) {
				this./**/pauseAllEmitters();
			} else {
				this.zeroUpdate();
				this./**/update(this.Ud, Ab, Mc);
				this._presimNeeded = false;
			}
		}
	}

	ke.prototype./**/restart = function (/**/position, /**/rotation, /**/options) {

		this.Nb(/**/position ? /**/position : this.Ab, /**/rotation ? /**/rotation : this.Mc);
		this._presimNeeded = true;

		for (var i = 0; i < this.od.length; ++i) {
			this.od[i].Jd(this.Ab, this.Mc);
		}

		this._presimNeeded = true;

		if (options && options.generatorsPaused) {
			this./**/pauseGeneratorsInAllEmitters();
		}

		if (options && options.paused) {
			this./**/pauseAllEmitters();
		} else {
			this.zeroUpdate();
			this./**/update(this.Ud, this.Ab, this.Mc);
			this._presimNeeded = false;
		}
	}

	ke.prototype.zeroUpdate = function () {
		for (var i = 0; i < this.od.length; ++i) {
			this.od[i].Id(0, this.Ab, this.Mc);
		}
	}

	ke.prototype./**/update = function (/**/dt, /**/position, /**/rotation) {
		var updatedTime = 0.0;
		var hc = [];
		ctx.T(hc, this.Ab);
		var frameRotation = [];
		ctx.U(frameRotation, this.Mc);

		if (/**/position && ctx.equalv3_(/**/position, this.Ab))
			/**/position = null;

		if (/**/rotation && ctx.equalq_(/**/rotation, this.Mc))
			/**/rotation = null;

		while ((/**/dt - updatedTime) + this.Cd >= this.Dd) {
			var cc = this.Rb;

			if (/**/position)
				ctx.ab(hc, this.Ab, /**/position, updatedTime / /**/dt);

			if (/**/rotation)
				ctx.slerpq(frameRotation, this.Mc, /**/rotation, updatedTime / /**/dt);

			for (var i = 0; i < this.od.length; ++i) {
				this.od[i].Id(this.Dd, hc, frameRotation);

				this.Rb = cc;
			}

			updatedTime += this.Dd - this.Cd;
			this.Cd = 0.0;
			this.Rb = cc + this.Dd;
		}

		if (/**/position)
			ctx.T(this.Ab, /**/position);

		if (/**/rotation)
			ctx.U(this.Mc, /**/rotation);

		this.Cd += /**/dt - updatedTime;
	}

	ke.prototype./**/resetPosition = function (/**/position, /**/rotation) {

		if (/**/position)
			ctx.T(this.Ab, /**/position);

		if (/**/rotation)
			ctx.U(this.Mc, /**/rotation);

		for (var i = 0; i < this.od.length; ++i) {
			this.od[i].Td(this.Ab, this.Mc);
		}
	}

	ke.prototype./**/setPropertyInAllEmitters = function (/**/name, /**/value) {
		var propName = "_".concat(/**/name);

		if (/**/value instanceof Array) {
			if (/**/value.length == 2) {
				for (var i = 0; i < this.od.length; ++i) {
					ctx.S(this.od[i][propName], /**/value);
				}
			}
			else {
				for (var i = 0; i < this.od.length; ++i) {
					ctx.T(this.od[i][propName], /**/value);
				}
			}
		}
		else {
			for (var i = 0; i < this.od.length; ++i) {
				this.od[i][propName] = /**/value;
			}
		}
	}

	ke.prototype./**/pauseAllEmitters = function() {
		for (var i = 0; i < this.od.length; ++i) {
			this.od[i]./**/pause();
		}
	}

	ke.prototype./**/unpauseAllEmitters = function () {
		for (var i = 0; i < this.od.length; ++i) {
			this.od[i]./**/unpause();
		}
		this.zeroUpdate();

		if (this._presimNeeded) {
			this./**/update(this.Ud, this.Ab, this.Mc);
			this._presimNeeded = false;
		}
	}

	ke.prototype./**/areAllEmittersPaused = function () {
		for (var i = 0; i < this.od.length; ++i) {
			if (!this.od[i].paused())
				return false;
		}
		return true;
	}

	ke.prototype./**/pauseGeneratorsInAllEmitters = function () {
		for (var i = 0; i < this.od.length; ++i) {
			this.od[i]./**/pauseGenerators();
		}
	}

	ke.prototype./**/unpauseGeneratorsInAllEmitters = function () {
		for (var i = 0; i < this.od.length; ++i) {
			this.od[i]./**/unpauseGenerators();
		}
	}

	ke.prototype./**/areGeneratorsInAllEmittersPaused = function () {
		for (var i = 0; i < this.od.length; ++i) {
			if (!this.od[i].generatorsPaused())
				return false;
		}
		return true;
	}

	ke.prototype./**/getNumParticles = function() {
		var numParticles = 0;

		for (var i = 0; i < this.od.length; ++i) {
			numParticles += this.od[i].getNumParticles();
		}

		return numParticles;
	}


	var le = function () {
		this._init = function (we, Ab, Mc, renderBuffer, options) {
			le.prototype._init.call(this, we, Ab, Mc, oe, options);

			this.texturesRemap = [];

			var indices = [];

			{
				var verDisp;
				for (var Wb = 0; Wb < this./**/model.Xe; ++Wb) {
					verDisp = Wb * 4;
					indices.push(verDisp + 0, verDisp + 3, verDisp + 1, verDisp + 1, verDisp + 3, verDisp + 2);
				}
			}

			this.renderBuffer = renderBuffer;
			this.renderBuffer.initialize(this./**/model.Xe * 4, [2], indices, this./**/model.Xe);
			this.renderBuffer.__numIndices = 0;
		}
	}

	le.prototype = new ke();

	le.prototype./**/fillGeometryBuffers = function (/**/cameraRight, /**/cameraUp, /**/cameraDir) {
		this.renderBuffer.cleanup();
		this.renderBuffer.__lastRenderCall = null;

		this.od.forEach(function (Bd) {
			Bd.ue(/**/cameraRight, /**/cameraUp, /**/cameraDir, this.renderBuffer);
		}, this);

		if (this.renderBuffer.__lastRenderCall)
			this.renderBuffer.pushRenderCall(this.renderBuffer.__lastRenderCall);
	}

	var me = function () {
		this._init = function (we, Ab, Mc, options) {
			me.prototype._init.call(this, we, Ab, Mc, ne, options);

			this.materials = [];
			this./**/model.materials.forEach(function (value) {
				this.materials.push(['source-over', 'lighter', 'multiply'][value]);
			}, this);

			this./**/textureDescs = [];
		}
	}

	me.prototype = new ke();

	me.prototype./**/draw = function (/**/context, /**/camera) {
		for (var i = 0; i < this.od.length; ++i) {
			this.od[i].Hd(/**/context, /**/camera);
		}
	}

	this.createWGLInstance = function (/**/position, /**/rotation, /**/renderBuffer, /**/options) {
		var Ld = new le();
		Ld._init(this, /**/position, /**/rotation, /**/renderBuffer, /**/options || {});
		return Ld;
	}

	this.createCanvas2DInstance = function (/**/position, /**/rotation, /**/options) {
		var Ld = new me();
		Ld._init(this, /**/position, /**/rotation, /**/options || {});
		return Ld;
	}
	this.textures = ['stars4x1_gold.png','glow_point_04_gold.png'];
	this.materials = [1];
	this.renderStyles = [{materialIndex:0,textureIndices:[0]},{materialIndex:0,textureIndices:[1]}];
	this.Xe = 20000;

	function Emitter_Stars() {

		var _1 = [], _3 = [], _6, _8, _10, _12=[], _12fs=[], _12vs=[], _12rw=[], _12rwn=[], _12rwl, _12v=[], _12p=[], _12dtl, _12dtp, _12df, _12fsd=[], _13, _14, _14i0, _14s0 = [], _15;
		this.pe = [{xe:0,Rc:4,Sc:1,renderStyleIndex:0}];
		this.name = "Stars";

		this.ud = function(Bd) {
			Bd.ed();
			Bd._14 = [
				[
					[0,1,1],
					[1,0.3,0.3],
					[0.3,0.7,0.7],
					[0.7,0,0]
				]
			];
			Bd.jd = 100;
			Bd.Vc = 0;
		}

		this.Mb = function(vd) {
			vd.rd = 3;
			vd.Gb = 1;
			vd.Jb = 1;
		}

		this.Pb = function(Qb, Bd, vd) {
			vd.rd = 3;
		}

		this.fd = function(Bd, Xb) {
			Xb._ = 0.0;
			ctx.randv3gen(_1, 10, Bd.Ld.rand);
			Xb._2 = [];
			ctx.rb(Xb._2, _1, Bd.Mc);
			ctx.c(Xb._2, Bd.Ab, Xb._2);
			ctx.randv3gen(_3, 100, Bd.Ld.rand);
			Xb._4 = [];
			ctx.rb(Xb._4, _3, Bd.Mc);
			ctx.c(Xb._4, Bd.ad, Xb._4);
			Xb._5 = 0;
			_6 = 0 + Bd.Ld.rand() * (1 - 0);
			Xb._7 = _6;
			_8 = 0 + Bd.Ld.rand() * (4 - 0);
			Xb._9 = _8;
			_10 = 20 + Bd.Ld.rand() * (40 - 20);
			Xb._11 = _10;
			ctx.T(Xb.Ab, Xb._2);
		}

		this.gd = function(Bd, Xb) {
			Xb._ = 0.0;
			ctx.randv3gen(_1, 10, Bd.Ld.rand);
			Xb._2 = [];
			ctx.rb(Xb._2, _1, Bd.Mc);
			ctx.c(Xb._2, Bd.Ab, Xb._2);
			ctx.randv3gen(_3, 100, Bd.Ld.rand);
			Xb._4 = [];
			ctx.rb(Xb._4, _3, Bd.Mc);
			ctx.c(Xb._4, Bd.ad, Xb._4);
			Xb._5 = 0;
			_6 = 0 + Bd.Ld.rand() * (1 - 0);
			Xb._7 = _6;
			_8 = 0 + Bd.Ld.rand() * (4 - 0);
			Xb._9 = _8;
			_10 = 20 + Bd.Ld.rand() * (40 - 20);
			Xb._11 = _10;
			ctx.T(Xb.Ab, Xb._2);
		}

		this.qc = function(Qb, Bd, Xb) {
			Xb._ += Qb;
			ctx.T(_12fs, [0,0,0]);
			ctx.T(_12vs, [0,0,0]);
			_12dtl = Qb;
			ctx.T(_12v, Xb._4);
			ctx.T(_12p, Xb._2);
			while (_12dtl > 0.0001) {
				_12dtp = _12dtl;
				ctx.T(_12fsd, _12fs);
				ctx.g(_12rw, _12vs, _12v);
				_12rwl = ctx.P(_12rw);
				if (_12rwl > 0.0001) {
					_12rwl = Math.sqrt(_12rwl);
					ctx.w(_12rwn, _12rw, _12rwl);
					_12df = 0.01 * 3 * _12rwl;
					if (_12df * _12dtp > 0.2) 
						_12dtp = 0.2 / _12df;
					ctx.c(_12fsd, _12fsd, ctx.v(_12rwn, _12rwl * _12df));
				}
				ctx.c(_12v, _12v, ctx.v(_12fsd, _12dtp));
				ctx.c(_12p, _12p, ctx.v(_12v, _12dtp));
				_12dtl -= _12dtp;
			}
			ctx.T(Xb._2, _12p);
			ctx.T(Xb._4, _12v);
			ctx.T(Xb.Ab, Xb._2);
			_13 = (Xb._ / Xb._7);
			_14i0=(_13<0?0:(_13>1?1:_13));
			_14i0<0.5?_14i0<0.264286?ctx.V(_14s0,0,(_14i0-0)*3.78378):ctx.V(_14s0,1,(_14i0-0.264286)*4.24242):_14i0<0.7?ctx.V(_14s0,2,(_14i0-0.5)*5):ctx.V(_14s0,3,(_14i0-0.7)*3.33333);
			_14 = Db.nb(Bd._14[0][_14s0[0]],_14s0[1]);
			_15 = (Xb._11 * _14);
			ctx.S(Xb.Pd,[0.5,0.5]);
			Xb.Md = Xb._5;
			ctx.V(Xb.Nd,_15,_15);
			ctx.T(Xb.gf,[1,1,1]);
			Xb.Od = 1;
			Xb.Qc = (Xb._9 < 0) ? 0 : ((Xb._9 >= 4) ? 3 : Xb._9);
		}

		this.Cc = function(Bd, Xb, Wc) {
			if (Xb._ > Xb._7) return true;
			return false;
		}


	}

	function Emitter_Glow() {

		var _1 = [], _3 = [], _6, _8, _10=[], _10fs=[], _10vs=[], _10rw=[], _10rwn=[], _10rwl, _10v=[], _10p=[], _10dtl, _10dtp, _10df, _10fsd=[], _11, _12, _12i0, _12s0 = [], _13, _14, _14i0, _14s0 = [];
		this.pe = [{xe:0,Rc:1,Sc:1,renderStyleIndex:1}];
		this.name = "Glow";

		this.ud = function(Bd) {
			Bd.ed();
			Bd._12 = [
				[
					[0,0.979724,0.979724],
					[0.979724,0,0]
				]
			];
			Bd._14 = [
				[
					[0.3,0.300138,0.297865,0.293212,0.286169,0.27669,0.264689,0.250044,0.232583,0.212082,0.188249,0.160699,0.128927,0.0922526,0.0497315,0,0]
				]
			];
			Bd.jd = 100;
			Bd.Vc = 0;
		}

		this.Mb = function(vd) {
			vd.rd = 15;
			vd.Gb = 1;
			vd.Jb = 1;
		}

		this.Pb = function(Qb, Bd, vd) {
			vd.rd = 15;
		}

		this.fd = function(Bd, Xb) {
			Xb._ = 0.0;
			ctx.W(_1, 0, 0, 0);
			Xb._2 = [];
			ctx.rb(Xb._2, _1, Bd.Mc);
			ctx.c(Xb._2, Bd.Ab, Xb._2);
			ctx.randv3gen(_3, 100, Bd.Ld.rand);
			Xb._4 = [];
			ctx.rb(Xb._4, _3, Bd.Mc);
			ctx.c(Xb._4, Bd.ad, Xb._4);
			Xb._5 = 0;
			_6 = 0.3 + Bd.Ld.rand() * (1 - 0.3);
			Xb._7 = _6;
			_8 = 70 + Bd.Ld.rand() * (90 - 70);
			Xb._9 = _8;
			ctx.T(Xb.Ab, Xb._2);
		}

		this.gd = function(Bd, Xb) {
			Xb._ = 0.0;
			ctx.W(_1, 0, 0, 0);
			Xb._2 = [];
			ctx.rb(Xb._2, _1, Bd.Mc);
			ctx.c(Xb._2, Bd.Ab, Xb._2);
			ctx.randv3gen(_3, 100, Bd.Ld.rand);
			Xb._4 = [];
			ctx.rb(Xb._4, _3, Bd.Mc);
			ctx.c(Xb._4, Bd.ad, Xb._4);
			Xb._5 = 0;
			_6 = 0.3 + Bd.Ld.rand() * (1 - 0.3);
			Xb._7 = _6;
			_8 = 70 + Bd.Ld.rand() * (90 - 70);
			Xb._9 = _8;
			ctx.T(Xb.Ab, Xb._2);
		}

		this.qc = function(Qb, Bd, Xb) {
			Xb._ += Qb;
			ctx.T(_10fs, [0,0,0]);
			ctx.T(_10vs, [0,0,0]);
			_10dtl = Qb;
			ctx.T(_10v, Xb._4);
			ctx.T(_10p, Xb._2);
			while (_10dtl > 0.0001) {
				_10dtp = _10dtl;
				ctx.T(_10fsd, _10fs);
				ctx.g(_10rw, _10vs, _10v);
				_10rwl = ctx.P(_10rw);
				if (_10rwl > 0.0001) {
					_10rwl = Math.sqrt(_10rwl);
					ctx.w(_10rwn, _10rw, _10rwl);
					_10df = 0.01 * 3 * _10rwl;
					if (_10df * _10dtp > 0.2) 
						_10dtp = 0.2 / _10df;
					ctx.c(_10fsd, _10fsd, ctx.v(_10rwn, _10rwl * _10df));
				}
				ctx.c(_10v, _10v, ctx.v(_10fsd, _10dtp));
				ctx.c(_10p, _10p, ctx.v(_10v, _10dtp));
				_10dtl -= _10dtp;
			}
			ctx.T(Xb._2, _10p);
			ctx.T(Xb._4, _10v);
			ctx.T(Xb.Ab, Xb._2);
			_11 = (Xb._ / Xb._7);
			_12i0=(_11<0?0:(_11>1?1:_11));
			_12i0<0.1?ctx.V(_12s0,0,(_12i0-0)*10):ctx.V(_12s0,1,(_12i0-0.1)*1.11111);
			_12 = Db.nb(Bd._12[0][_12s0[0]],_12s0[1]);
			_13 = (Xb._9 * _12);
			_14i0=(_11<0?0:(_11>1?1:_11));
			ctx.V(_14s0,0,(_14i0-0)*15);
			_14 = Db.nb(Bd._14[0][_14s0[0]],_14s0[1]);
			ctx.S(Xb.Pd,[0.5,0.5]);
			Xb.Md = Xb._5;
			ctx.V(Xb.Nd,_13,_13);
			ctx.T(Xb.gf,[1,1,1]);
			Xb.Od = _14;
			Xb.Qc = 0;
		}

		this.Cc = function(Bd, Xb, Wc) {
			if (Xb._ > Xb._7) return true;
			return false;
		}


	}

	function Emitter_Parent() {

		var _1 = [], _5, _6, _7, _7i0, _7s0 = [], _8 = [[], []], _8i, _8s = [], _9 = [], _10op0=[], _11;
		this.pe = [];
		this.name = "Parent";

		this.ud = function(Bd) {
			Bd.dd();
			Bd._7 = [
				[
					[0,1,1]
				]
			];
			Bd._8 = [
				[[[163.324,174.476],[-0.588521,0.808482]],[[161.231,177.351],[-0.603492,0.797369]],[[159.085,180.187],[-0.612881,0.790176]],[[156.905,182.997],[-0.616567,0.787302]],[[154.713,185.797],[-0.614293,0.789078]],[[152.528,188.603],[-0.605673,0.795714]],[[150.374,191.433],[-0.590226,0.807238]],[[148.275,194.303],[-0.567314,0.823501]],[[146.258,197.232],[-0.536245,0.844063]],[[144.351,200.233],[-0.496431,0.868076]],[[142.586,203.32],[-0.44756,0.894254]],[[140.994,206.5],[-0.389842,0.920882]],[[139.608,209.774],[-0.324288,0.945959]],[[138.455,213.137],[-0.252767,0.967527]],[[137.556,216.577],[-0.177891,0.98405]],[[136.924,220.076],[-0.177891,0.98405]],[[136.924,220.076],[-0.177891,0.98405]]],
				[[[136.924,220.076],[-0.00624986,0.99998]],[[135.724,412.076],[-0.00624986,0.99998]],[[135.724,412.076],[-0.00624986,0.99998]]],
				[[[135.724,412.076],[0.232901,0.972501]],[[136.669,416.021],[0.309496,0.950901]],[[137.924,419.878],[0.382255,0.924057]],[[139.475,423.626],[0.451599,0.892221]],[[141.307,427.246],[0.517914,0.855433]],[[143.407,430.716],[0.581554,0.813508]],[[145.766,434.015],[0.642739,0.766085]],[[148.374,437.123],[0.701525,0.712645]],[[151.219,440.014],[0.757756,0.652538]],[[154.293,442.66],[0.810953,0.585111]],[[157.582,445.034],[0.860304,0.509782]],[[161.072,447.101],[0.90462,0.426219]],[[164.741,448.83],[0.942376,0.334556]],[[168.562,450.187],[0.971821,0.235719]],[[172.504,451.143],[0.991321,0.131461]],[[176.524,451.676],[0.991321,0.131461]],[[176.524,451.676],[0.991321,0.131461]]],
				[[[176.524,451.676],[1,-6.37376e-08]],[[655.324,451.676],[1,-6.37376e-08]],[[655.324,451.676],[1,-6.37376e-08]]],
				[[[655.324,451.676],[0.982936,-0.183947]],[[660.349,450.736],[0.944034,-0.32985]],[[665.176,449.049],[0.889244,-0.457434]],[[669.724,446.71],[0.825962,-0.563726]],[[673.949,443.826],[0.759943,-0.64999]],[[677.836,440.501],[0.694721,-0.719279]],[[681.39,436.821],[0.63176,-0.775164]],[[684.623,432.855],[0.571379,-0.820686]],[[687.546,428.656],[0.513297,-0.858211]],[[690.173,424.265],[0.456769,-0.889586]],[[692.51,419.713],[0.400808,-0.916162]],[[694.561,415.025],[0.344289,-0.938864]],[[696.322,410.221],[0.285814,-0.958285]],[[697.785,405.318],[0.223621,-0.974676]],[[698.929,400.33],[0.155364,-0.987857]],[[699.724,395.276],[0.155364,-0.987857]],[[699.724,395.276],[0.155364,-0.987857]]],
				[[[699.724,395.276],[-0.011975,-0.999928]],[[697.324,194.876],[-0.011975,-0.999928]],[[697.324,194.876],[-0.011975,-0.999928]]],
				[[[697.324,194.876],[-0.287262,-0.957852]],[[696.374,191.709],[-0.382807,-0.923828]],[[695.109,188.656],[-0.477504,-0.87863]],[[693.531,185.751],[-0.566515,-0.824052]],[[691.658,183.027],[-0.645853,-0.763462]],[[689.523,180.503],[-0.713189,-0.700972]],[[687.165,178.186],[-0.768099,-0.640332]],[[684.626,176.069],[-0.81147,-0.584394]],[[681.942,174.137],[-0.844854,-0.534997]],[[679.149,172.368],[-0.869956,-0.493129]],[[676.272,170.737],[-0.888286,-0.459291]],[[673.335,169.218],[-0.901003,-0.433813]],[[670.355,167.784],[-0.90881,-0.41721]],[[667.349,166.404],[-0.911966,-0.410265]],[[664.333,165.047],[-0.910012,-0.414582]],[[661.324,163.676],[-0.910012,-0.414582]],[[661.324,163.676],[-0.910012,-0.414582]]]
			];
			Bd.uc(new Emitter_Stars(), { xc: 1, sd: false });
			Bd.uc(new Emitter_Glow(), { xc: 1, sd: false });
			Bd.jd = 100;
			Bd.Vc = 0;
		}

		this.Mb = function(vd) {
			vd.zb = 1;
			vd.Gb = 1;
			vd.Jb = 1;
		}

		this.Pb = function(Qb, Bd, vd) {
			vd.zb = 1;
		}

		this.fd = function(Bd, Xb) {
			Xb._ = 0.0;
			ctx.W(_1, 0, 0, 0);
			Xb._2 = [];
			ctx.rb(Xb._2, _1, Bd.Mc);
			ctx.c(Xb._2, Bd.Ab, Xb._2);
			Xb._3 = 0;
			Xb._4 = [];
			ctx.U(Xb._4, Bd.Mc);
			_5 = 2.1;
			_6 = (Xb._ / _5);
			_7i0=(_6<0?0:(_6>1?1:_6));
			ctx.V(_7s0,0,(_7i0-0)*1);
			_7 = Db.nb(Bd._7[0][_7s0[0]],_7s0[1]);
			_8i = Db.kb(_7);
			_8i<0.706092?_8i<0.220685?_8i<0.0479785?ctx.V(_8s,0,(_8i-0)*312.64):ctx.V(_8s,1,(_8i-0.0479785)*5.79015):_8i<0.275412?ctx.V(_8s,2,(_8i-0.220685)*274.088):ctx.V(_8s,3,(_8i-0.275412)*2.32191):_8i<0.955389?_8i<0.775117?ctx.V(_8s,4,(_8i-0.706092)*217.314):ctx.V(_8s,5,(_8i-0.775117)*5.54716):ctx.V(_8s,6,(_8i-0.955389)*336.239);
			Db.mb(_8, Bd._8[_8s[0]], _8s[1]);
			ctx.W(_9, _8[0][0], _8[0][1], 0);
			ctx.rb(_10op0, _9, Xb._4);
			ctx.c(_10op0, _10op0, [0,0,0]);
			_11 = ctx.d(Xb._2, _10op0);
			ctx.T(Xb.Ab, _11);
		}

		this.gd = function(Bd, Xb) {
			Xb._ = 0.0;
			ctx.W(_1, 0, 0, 0);
			Xb._2 = [];
			ctx.rb(Xb._2, _1, Bd.Mc);
			ctx.c(Xb._2, Bd.Ab, Xb._2);
			Xb._3 = 0;
			Xb._4 = [];
			ctx.U(Xb._4, Bd.Mc);
			_5 = 2.1;
			_6 = (Xb._ / _5);
			_7i0=(_6<0?0:(_6>1?1:_6));
			ctx.V(_7s0,0,(_7i0-0)*1);
			_7 = Db.nb(Bd._7[0][_7s0[0]],_7s0[1]);
			_8i = Db.kb(_7);
			_8i<0.706092?_8i<0.220685?_8i<0.0479785?ctx.V(_8s,0,(_8i-0)*312.64):ctx.V(_8s,1,(_8i-0.0479785)*5.79015):_8i<0.275412?ctx.V(_8s,2,(_8i-0.220685)*274.088):ctx.V(_8s,3,(_8i-0.275412)*2.32191):_8i<0.955389?_8i<0.775117?ctx.V(_8s,4,(_8i-0.706092)*217.314):ctx.V(_8s,5,(_8i-0.775117)*5.54716):ctx.V(_8s,6,(_8i-0.955389)*336.239);
			Db.mb(_8, Bd._8[_8s[0]], _8s[1]);
			ctx.W(_9, _8[0][0], _8[0][1], 0);
			ctx.rb(_10op0, _9, Xb._4);
			ctx.c(_10op0, _10op0, [0,0,0]);
			_11 = ctx.d(Xb._2, _10op0);
			ctx.T(Xb.Ab, _11);
		}

		this.qc = function(Qb, Bd, Xb) {
			Xb._ += Qb;
			_5 = 2.1;
			_6 = (Xb._ / _5);
			_7i0=(_6<0?0:(_6>1?1:_6));
			ctx.V(_7s0,0,(_7i0-0)*1);
			_7 = Db.nb(Bd._7[0][_7s0[0]],_7s0[1]);
			_8i = Db.kb(_7);
			_8i<0.706092?_8i<0.220685?_8i<0.0479785?ctx.V(_8s,0,(_8i-0)*312.64):ctx.V(_8s,1,(_8i-0.0479785)*5.79015):_8i<0.275412?ctx.V(_8s,2,(_8i-0.220685)*274.088):ctx.V(_8s,3,(_8i-0.275412)*2.32191):_8i<0.955389?_8i<0.775117?ctx.V(_8s,4,(_8i-0.706092)*217.314):ctx.V(_8s,5,(_8i-0.775117)*5.54716):ctx.V(_8s,6,(_8i-0.955389)*336.239);
			Db.mb(_8, Bd._8[_8s[0]], _8s[1]);
			ctx.W(_9, _8[0][0], _8[0][1], 0);
			ctx.rb(_10op0, _9, Xb._4);
			ctx.c(_10op0, _10op0, [0,0,0]);
			_11 = ctx.d(Xb._2, _10op0);
			ctx.T(Xb.Ab, _11);
		}

		this.Cc = function(Bd, Xb, Wc) {
			_5 = 2.1;
			if (Xb._ > _5) return true;
			return false;
		}


	}

	this.qd = function(Ld) {
		Ld.Dd = 0.0333333;
		Ld.Ud = 2;
		Ld.rand = function() { return Math.random(); };
		Ld.pd(new Emitter_Parent());
	}
		this.kb = function (v) { 			return (v < 0) ? 0 : ((v > 1) ? 1 : v); 		}

		this.mb = function(r, path, je) { 			var indexInt = Math.floor(je); 			var lerp = je - indexInt; 			ctx.Y(r[0], path[indexInt][0], path[indexInt + 1][0], lerp); 			ctx.Y(r[1], path[indexInt][1], path[indexInt + 1][1], lerp); 		}

		this.nb = function(funcValues, je) { 			var indexInt = Math.floor(je); 			var nextInt = indexInt + 1; 			return ctx.X(funcValues[indexInt], funcValues[nextInt], je - indexInt); 		}


}

return Frame_stars;
}));
