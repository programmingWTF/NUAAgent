window.__ModuleLoader__.load({
	id: "@linxin666/dsh-remote-web-ui",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		//#region \0rolldown/runtime.js
		var __create = Object.create;
		var __defProp$1 = Object.defineProperty;
		var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
		var __getOwnPropNames = Object.getOwnPropertyNames;
		var __getProtoOf = Object.getPrototypeOf;
		var __hasOwnProp$1 = Object.prototype.hasOwnProperty;
		var __copyProps = (to, from, except, desc) => {
			if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
				key = keys[i];
				if (!__hasOwnProp$1.call(to, key) && key !== except) __defProp$1(to, key, {
					get: ((k) => from[k]).bind(null, key),
					enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
				});
			}
			return to;
		};
		var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp$1(target, "default", {
			value: mod,
			enumerable: true
		}) : target, mod));
		//#endregion
		let react = require("react");
		react = __toESM(react, 1);
		let react_dom_client = require("react-dom/client");
		let react_dom = require("react-dom");
		let _deepseek_ai_dsh_client_ui_primitives = require("@nuaagent/client-ui-primitives");
		let react_jsx_runtime = require("react/jsx-runtime");
		let _deepseek_ai_dsh_client_runtime_client = require("@nuaagent/client-runtime/client");
		//#region ../../node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs
		function r(e) {
			var t, f, n = "";
			if ("string" == typeof e || "number" == typeof e) n += e;
			else if ("object" == typeof e) if (Array.isArray(e)) {
				var o = e.length;
				for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
			} else for (f in e) e[f] && (n && (n += " "), n += f);
			return n;
		}
		function clsx() {
			for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
			return n;
		}
		//#endregion
		//#region ../../node_modules/.pnpm/qrcode.react@4.2.0_react@18.3.1/node_modules/qrcode.react/lib/esm/index.js
		var __defProp = Object.defineProperty;
		var __getOwnPropSymbols = Object.getOwnPropertySymbols;
		var __hasOwnProp = Object.prototype.hasOwnProperty;
		var __propIsEnum = Object.prototype.propertyIsEnumerable;
		var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {
			enumerable: true,
			configurable: true,
			writable: true,
			value
		}) : obj[key] = value;
		var __spreadValues = (a, b) => {
			for (var prop in b || (b = {})) if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);
			if (__getOwnPropSymbols) {
				for (var prop of __getOwnPropSymbols(b)) if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
			}
			return a;
		};
		var __objRest = (source, exclude) => {
			var target = {};
			for (var prop in source) if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0) target[prop] = source[prop];
			if (source != null && __getOwnPropSymbols) {
				for (var prop of __getOwnPropSymbols(source)) if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop)) target[prop] = source[prop];
			}
			return target;
		};
		/**
		* @license QR Code generator library (TypeScript)
		* Copyright (c) Project Nayuki.
		* SPDX-License-Identifier: MIT
		*/
		var qrcodegen;
		((qrcodegen2) => {
			const _QrCode = class _QrCode {
				constructor(version, errorCorrectionLevel, dataCodewords, msk) {
					this.version = version;
					this.errorCorrectionLevel = errorCorrectionLevel;
					this.modules = [];
					this.isFunction = [];
					if (version < _QrCode.MIN_VERSION || version > _QrCode.MAX_VERSION) throw new RangeError("Version value out of range");
					if (msk < -1 || msk > 7) throw new RangeError("Mask value out of range");
					this.size = version * 4 + 17;
					let row = [];
					for (let i = 0; i < this.size; i++) row.push(false);
					for (let i = 0; i < this.size; i++) {
						this.modules.push(row.slice());
						this.isFunction.push(row.slice());
					}
					this.drawFunctionPatterns();
					const allCodewords = this.addEccAndInterleave(dataCodewords);
					this.drawCodewords(allCodewords);
					if (msk == -1) {
						let minPenalty = 1e9;
						for (let i = 0; i < 8; i++) {
							this.applyMask(i);
							this.drawFormatBits(i);
							const penalty = this.getPenaltyScore();
							if (penalty < minPenalty) {
								msk = i;
								minPenalty = penalty;
							}
							this.applyMask(i);
						}
					}
					assert(0 <= msk && msk <= 7);
					this.mask = msk;
					this.applyMask(msk);
					this.drawFormatBits(msk);
					this.isFunction = [];
				}
				static encodeText(text, ecl) {
					const segs = qrcodegen2.QrSegment.makeSegments(text);
					return _QrCode.encodeSegments(segs, ecl);
				}
				static encodeBinary(data, ecl) {
					const seg = qrcodegen2.QrSegment.makeBytes(data);
					return _QrCode.encodeSegments([seg], ecl);
				}
				static encodeSegments(segs, ecl, minVersion = 1, maxVersion = 40, mask = -1, boostEcl = true) {
					if (!(_QrCode.MIN_VERSION <= minVersion && minVersion <= maxVersion && maxVersion <= _QrCode.MAX_VERSION) || mask < -1 || mask > 7) throw new RangeError("Invalid value");
					let version;
					let dataUsedBits;
					for (version = minVersion;; version++) {
						const dataCapacityBits2 = _QrCode.getNumDataCodewords(version, ecl) * 8;
						const usedBits = QrSegment.getTotalBits(segs, version);
						if (usedBits <= dataCapacityBits2) {
							dataUsedBits = usedBits;
							break;
						}
						if (version >= maxVersion) throw new RangeError("Data too long");
					}
					for (const newEcl of [
						_QrCode.Ecc.MEDIUM,
						_QrCode.Ecc.QUARTILE,
						_QrCode.Ecc.HIGH
					]) if (boostEcl && dataUsedBits <= _QrCode.getNumDataCodewords(version, newEcl) * 8) ecl = newEcl;
					let bb = [];
					for (const seg of segs) {
						appendBits(seg.mode.modeBits, 4, bb);
						appendBits(seg.numChars, seg.mode.numCharCountBits(version), bb);
						for (const b of seg.getData()) bb.push(b);
					}
					assert(bb.length == dataUsedBits);
					const dataCapacityBits = _QrCode.getNumDataCodewords(version, ecl) * 8;
					assert(bb.length <= dataCapacityBits);
					appendBits(0, Math.min(4, dataCapacityBits - bb.length), bb);
					appendBits(0, (8 - bb.length % 8) % 8, bb);
					assert(bb.length % 8 == 0);
					for (let padByte = 236; bb.length < dataCapacityBits; padByte ^= 253) appendBits(padByte, 8, bb);
					let dataCodewords = [];
					while (dataCodewords.length * 8 < bb.length) dataCodewords.push(0);
					bb.forEach((b, i) => dataCodewords[i >>> 3] |= b << 7 - (i & 7));
					return new _QrCode(version, ecl, dataCodewords, mask);
				}
				getModule(x, y) {
					return 0 <= x && x < this.size && 0 <= y && y < this.size && this.modules[y][x];
				}
				getModules() {
					return this.modules;
				}
				drawFunctionPatterns() {
					for (let i = 0; i < this.size; i++) {
						this.setFunctionModule(6, i, i % 2 == 0);
						this.setFunctionModule(i, 6, i % 2 == 0);
					}
					this.drawFinderPattern(3, 3);
					this.drawFinderPattern(this.size - 4, 3);
					this.drawFinderPattern(3, this.size - 4);
					const alignPatPos = this.getAlignmentPatternPositions();
					const numAlign = alignPatPos.length;
					for (let i = 0; i < numAlign; i++) for (let j = 0; j < numAlign; j++) if (!(i == 0 && j == 0 || i == 0 && j == numAlign - 1 || i == numAlign - 1 && j == 0)) this.drawAlignmentPattern(alignPatPos[i], alignPatPos[j]);
					this.drawFormatBits(0);
					this.drawVersion();
				}
				drawFormatBits(mask) {
					const data = this.errorCorrectionLevel.formatBits << 3 | mask;
					let rem = data;
					for (let i = 0; i < 10; i++) rem = rem << 1 ^ (rem >>> 9) * 1335;
					const bits = (data << 10 | rem) ^ 21522;
					assert(bits >>> 15 == 0);
					for (let i = 0; i <= 5; i++) this.setFunctionModule(8, i, getBit(bits, i));
					this.setFunctionModule(8, 7, getBit(bits, 6));
					this.setFunctionModule(8, 8, getBit(bits, 7));
					this.setFunctionModule(7, 8, getBit(bits, 8));
					for (let i = 9; i < 15; i++) this.setFunctionModule(14 - i, 8, getBit(bits, i));
					for (let i = 0; i < 8; i++) this.setFunctionModule(this.size - 1 - i, 8, getBit(bits, i));
					for (let i = 8; i < 15; i++) this.setFunctionModule(8, this.size - 15 + i, getBit(bits, i));
					this.setFunctionModule(8, this.size - 8, true);
				}
				drawVersion() {
					if (this.version < 7) return;
					let rem = this.version;
					for (let i = 0; i < 12; i++) rem = rem << 1 ^ (rem >>> 11) * 7973;
					const bits = this.version << 12 | rem;
					assert(bits >>> 18 == 0);
					for (let i = 0; i < 18; i++) {
						const color = getBit(bits, i);
						const a = this.size - 11 + i % 3;
						const b = Math.floor(i / 3);
						this.setFunctionModule(a, b, color);
						this.setFunctionModule(b, a, color);
					}
				}
				drawFinderPattern(x, y) {
					for (let dy = -4; dy <= 4; dy++) for (let dx = -4; dx <= 4; dx++) {
						const dist = Math.max(Math.abs(dx), Math.abs(dy));
						const xx = x + dx;
						const yy = y + dy;
						if (0 <= xx && xx < this.size && 0 <= yy && yy < this.size) this.setFunctionModule(xx, yy, dist != 2 && dist != 4);
					}
				}
				drawAlignmentPattern(x, y) {
					for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) this.setFunctionModule(x + dx, y + dy, Math.max(Math.abs(dx), Math.abs(dy)) != 1);
				}
				setFunctionModule(x, y, isDark) {
					this.modules[y][x] = isDark;
					this.isFunction[y][x] = true;
				}
				addEccAndInterleave(data) {
					const ver = this.version;
					const ecl = this.errorCorrectionLevel;
					if (data.length != _QrCode.getNumDataCodewords(ver, ecl)) throw new RangeError("Invalid argument");
					const numBlocks = _QrCode.NUM_ERROR_CORRECTION_BLOCKS[ecl.ordinal][ver];
					const blockEccLen = _QrCode.ECC_CODEWORDS_PER_BLOCK[ecl.ordinal][ver];
					const rawCodewords = Math.floor(_QrCode.getNumRawDataModules(ver) / 8);
					const numShortBlocks = numBlocks - rawCodewords % numBlocks;
					const shortBlockLen = Math.floor(rawCodewords / numBlocks);
					let blocks = [];
					const rsDiv = _QrCode.reedSolomonComputeDivisor(blockEccLen);
					for (let i = 0, k = 0; i < numBlocks; i++) {
						let dat = data.slice(k, k + shortBlockLen - blockEccLen + (i < numShortBlocks ? 0 : 1));
						k += dat.length;
						const ecc = _QrCode.reedSolomonComputeRemainder(dat, rsDiv);
						if (i < numShortBlocks) dat.push(0);
						blocks.push(dat.concat(ecc));
					}
					let result = [];
					for (let i = 0; i < blocks[0].length; i++) blocks.forEach((block, j) => {
						if (i != shortBlockLen - blockEccLen || j >= numShortBlocks) result.push(block[i]);
					});
					assert(result.length == rawCodewords);
					return result;
				}
				drawCodewords(data) {
					if (data.length != Math.floor(_QrCode.getNumRawDataModules(this.version) / 8)) throw new RangeError("Invalid argument");
					let i = 0;
					for (let right = this.size - 1; right >= 1; right -= 2) {
						if (right == 6) right = 5;
						for (let vert = 0; vert < this.size; vert++) for (let j = 0; j < 2; j++) {
							const x = right - j;
							const y = (right + 1 & 2) == 0 ? this.size - 1 - vert : vert;
							if (!this.isFunction[y][x] && i < data.length * 8) {
								this.modules[y][x] = getBit(data[i >>> 3], 7 - (i & 7));
								i++;
							}
						}
					}
					assert(i == data.length * 8);
				}
				applyMask(mask) {
					if (mask < 0 || mask > 7) throw new RangeError("Mask value out of range");
					for (let y = 0; y < this.size; y++) for (let x = 0; x < this.size; x++) {
						let invert;
						switch (mask) {
							case 0:
								invert = (x + y) % 2 == 0;
								break;
							case 1:
								invert = y % 2 == 0;
								break;
							case 2:
								invert = x % 3 == 0;
								break;
							case 3:
								invert = (x + y) % 3 == 0;
								break;
							case 4:
								invert = (Math.floor(x / 3) + Math.floor(y / 2)) % 2 == 0;
								break;
							case 5:
								invert = x * y % 2 + x * y % 3 == 0;
								break;
							case 6:
								invert = (x * y % 2 + x * y % 3) % 2 == 0;
								break;
							case 7:
								invert = ((x + y) % 2 + x * y % 3) % 2 == 0;
								break;
							default: throw new Error("Unreachable");
						}
						if (!this.isFunction[y][x] && invert) this.modules[y][x] = !this.modules[y][x];
					}
				}
				getPenaltyScore() {
					let result = 0;
					for (let y = 0; y < this.size; y++) {
						let runColor = false;
						let runX = 0;
						let runHistory = [
							0,
							0,
							0,
							0,
							0,
							0,
							0
						];
						for (let x = 0; x < this.size; x++) if (this.modules[y][x] == runColor) {
							runX++;
							if (runX == 5) result += _QrCode.PENALTY_N1;
							else if (runX > 5) result++;
						} else {
							this.finderPenaltyAddHistory(runX, runHistory);
							if (!runColor) result += this.finderPenaltyCountPatterns(runHistory) * _QrCode.PENALTY_N3;
							runColor = this.modules[y][x];
							runX = 1;
						}
						result += this.finderPenaltyTerminateAndCount(runColor, runX, runHistory) * _QrCode.PENALTY_N3;
					}
					for (let x = 0; x < this.size; x++) {
						let runColor = false;
						let runY = 0;
						let runHistory = [
							0,
							0,
							0,
							0,
							0,
							0,
							0
						];
						for (let y = 0; y < this.size; y++) if (this.modules[y][x] == runColor) {
							runY++;
							if (runY == 5) result += _QrCode.PENALTY_N1;
							else if (runY > 5) result++;
						} else {
							this.finderPenaltyAddHistory(runY, runHistory);
							if (!runColor) result += this.finderPenaltyCountPatterns(runHistory) * _QrCode.PENALTY_N3;
							runColor = this.modules[y][x];
							runY = 1;
						}
						result += this.finderPenaltyTerminateAndCount(runColor, runY, runHistory) * _QrCode.PENALTY_N3;
					}
					for (let y = 0; y < this.size - 1; y++) for (let x = 0; x < this.size - 1; x++) {
						const color = this.modules[y][x];
						if (color == this.modules[y][x + 1] && color == this.modules[y + 1][x] && color == this.modules[y + 1][x + 1]) result += _QrCode.PENALTY_N2;
					}
					let dark = 0;
					for (const row of this.modules) dark = row.reduce((sum, color) => sum + (color ? 1 : 0), dark);
					const total = this.size * this.size;
					const k = Math.ceil(Math.abs(dark * 20 - total * 10) / total) - 1;
					assert(0 <= k && k <= 9);
					result += k * _QrCode.PENALTY_N4;
					assert(0 <= result && result <= 2568888);
					return result;
				}
				getAlignmentPatternPositions() {
					if (this.version == 1) return [];
					else {
						const numAlign = Math.floor(this.version / 7) + 2;
						const step = this.version == 32 ? 26 : Math.ceil((this.version * 4 + 4) / (numAlign * 2 - 2)) * 2;
						let result = [6];
						for (let pos = this.size - 7; result.length < numAlign; pos -= step) result.splice(1, 0, pos);
						return result;
					}
				}
				static getNumRawDataModules(ver) {
					if (ver < _QrCode.MIN_VERSION || ver > _QrCode.MAX_VERSION) throw new RangeError("Version number out of range");
					let result = (16 * ver + 128) * ver + 64;
					if (ver >= 2) {
						const numAlign = Math.floor(ver / 7) + 2;
						result -= (25 * numAlign - 10) * numAlign - 55;
						if (ver >= 7) result -= 36;
					}
					assert(208 <= result && result <= 29648);
					return result;
				}
				static getNumDataCodewords(ver, ecl) {
					return Math.floor(_QrCode.getNumRawDataModules(ver) / 8) - _QrCode.ECC_CODEWORDS_PER_BLOCK[ecl.ordinal][ver] * _QrCode.NUM_ERROR_CORRECTION_BLOCKS[ecl.ordinal][ver];
				}
				static reedSolomonComputeDivisor(degree) {
					if (degree < 1 || degree > 255) throw new RangeError("Degree out of range");
					let result = [];
					for (let i = 0; i < degree - 1; i++) result.push(0);
					result.push(1);
					let root = 1;
					for (let i = 0; i < degree; i++) {
						for (let j = 0; j < result.length; j++) {
							result[j] = _QrCode.reedSolomonMultiply(result[j], root);
							if (j + 1 < result.length) result[j] ^= result[j + 1];
						}
						root = _QrCode.reedSolomonMultiply(root, 2);
					}
					return result;
				}
				static reedSolomonComputeRemainder(data, divisor) {
					let result = divisor.map((_) => 0);
					for (const b of data) {
						const factor = b ^ result.shift();
						result.push(0);
						divisor.forEach((coef, i) => result[i] ^= _QrCode.reedSolomonMultiply(coef, factor));
					}
					return result;
				}
				static reedSolomonMultiply(x, y) {
					if (x >>> 8 != 0 || y >>> 8 != 0) throw new RangeError("Byte out of range");
					let z = 0;
					for (let i = 7; i >= 0; i--) {
						z = z << 1 ^ (z >>> 7) * 285;
						z ^= (y >>> i & 1) * x;
					}
					assert(z >>> 8 == 0);
					return z;
				}
				finderPenaltyCountPatterns(runHistory) {
					const n = runHistory[1];
					assert(n <= this.size * 3);
					const core = n > 0 && runHistory[2] == n && runHistory[3] == n * 3 && runHistory[4] == n && runHistory[5] == n;
					return (core && runHistory[0] >= n * 4 && runHistory[6] >= n ? 1 : 0) + (core && runHistory[6] >= n * 4 && runHistory[0] >= n ? 1 : 0);
				}
				finderPenaltyTerminateAndCount(currentRunColor, currentRunLength, runHistory) {
					if (currentRunColor) {
						this.finderPenaltyAddHistory(currentRunLength, runHistory);
						currentRunLength = 0;
					}
					currentRunLength += this.size;
					this.finderPenaltyAddHistory(currentRunLength, runHistory);
					return this.finderPenaltyCountPatterns(runHistory);
				}
				finderPenaltyAddHistory(currentRunLength, runHistory) {
					if (runHistory[0] == 0) currentRunLength += this.size;
					runHistory.pop();
					runHistory.unshift(currentRunLength);
				}
			};
			_QrCode.MIN_VERSION = 1;
			_QrCode.MAX_VERSION = 40;
			_QrCode.PENALTY_N1 = 3;
			_QrCode.PENALTY_N2 = 3;
			_QrCode.PENALTY_N3 = 40;
			_QrCode.PENALTY_N4 = 10;
			_QrCode.ECC_CODEWORDS_PER_BLOCK = [
				[
					-1,
					7,
					10,
					15,
					20,
					26,
					18,
					20,
					24,
					30,
					18,
					20,
					24,
					26,
					30,
					22,
					24,
					28,
					30,
					28,
					28,
					28,
					28,
					30,
					30,
					26,
					28,
					30,
					30,
					30,
					30,
					30,
					30,
					30,
					30,
					30,
					30,
					30,
					30,
					30,
					30
				],
				[
					-1,
					10,
					16,
					26,
					18,
					24,
					16,
					18,
					22,
					22,
					26,
					30,
					22,
					22,
					24,
					24,
					28,
					28,
					26,
					26,
					26,
					26,
					28,
					28,
					28,
					28,
					28,
					28,
					28,
					28,
					28,
					28,
					28,
					28,
					28,
					28,
					28,
					28,
					28,
					28,
					28
				],
				[
					-1,
					13,
					22,
					18,
					26,
					18,
					24,
					18,
					22,
					20,
					24,
					28,
					26,
					24,
					20,
					30,
					24,
					28,
					28,
					26,
					30,
					28,
					30,
					30,
					30,
					30,
					28,
					30,
					30,
					30,
					30,
					30,
					30,
					30,
					30,
					30,
					30,
					30,
					30,
					30,
					30
				],
				[
					-1,
					17,
					28,
					22,
					16,
					22,
					28,
					26,
					26,
					24,
					28,
					24,
					28,
					22,
					24,
					24,
					30,
					28,
					28,
					26,
					28,
					30,
					24,
					30,
					30,
					30,
					30,
					30,
					30,
					30,
					30,
					30,
					30,
					30,
					30,
					30,
					30,
					30,
					30,
					30,
					30
				]
			];
			_QrCode.NUM_ERROR_CORRECTION_BLOCKS = [
				[
					-1,
					1,
					1,
					1,
					1,
					1,
					2,
					2,
					2,
					2,
					4,
					4,
					4,
					4,
					4,
					6,
					6,
					6,
					6,
					7,
					8,
					8,
					9,
					9,
					10,
					12,
					12,
					12,
					13,
					14,
					15,
					16,
					17,
					18,
					19,
					19,
					20,
					21,
					22,
					24,
					25
				],
				[
					-1,
					1,
					1,
					1,
					2,
					2,
					4,
					4,
					4,
					5,
					5,
					5,
					8,
					9,
					9,
					10,
					10,
					11,
					13,
					14,
					16,
					17,
					17,
					18,
					20,
					21,
					23,
					25,
					26,
					28,
					29,
					31,
					33,
					35,
					37,
					38,
					40,
					43,
					45,
					47,
					49
				],
				[
					-1,
					1,
					1,
					2,
					2,
					4,
					4,
					6,
					6,
					8,
					8,
					8,
					10,
					12,
					16,
					12,
					17,
					16,
					18,
					21,
					20,
					23,
					23,
					25,
					27,
					29,
					34,
					34,
					35,
					38,
					40,
					43,
					45,
					48,
					51,
					53,
					56,
					59,
					62,
					65,
					68
				],
				[
					-1,
					1,
					1,
					2,
					4,
					4,
					4,
					5,
					6,
					8,
					8,
					11,
					11,
					16,
					16,
					18,
					16,
					19,
					21,
					25,
					25,
					25,
					34,
					30,
					32,
					35,
					37,
					40,
					42,
					45,
					48,
					51,
					54,
					57,
					60,
					63,
					66,
					70,
					74,
					77,
					81
				]
			];
			qrcodegen2.QrCode = _QrCode;
			function appendBits(val, len, bb) {
				if (len < 0 || len > 31 || val >>> len != 0) throw new RangeError("Value out of range");
				for (let i = len - 1; i >= 0; i--) bb.push(val >>> i & 1);
			}
			function getBit(x, i) {
				return (x >>> i & 1) != 0;
			}
			function assert(cond) {
				if (!cond) throw new Error("Assertion error");
			}
			const _QrSegment = class _QrSegment {
				constructor(mode, numChars, bitData) {
					this.mode = mode;
					this.numChars = numChars;
					this.bitData = bitData;
					if (numChars < 0) throw new RangeError("Invalid argument");
					this.bitData = bitData.slice();
				}
				static makeBytes(data) {
					let bb = [];
					for (const b of data) appendBits(b, 8, bb);
					return new _QrSegment(_QrSegment.Mode.BYTE, data.length, bb);
				}
				static makeNumeric(digits) {
					if (!_QrSegment.isNumeric(digits)) throw new RangeError("String contains non-numeric characters");
					let bb = [];
					for (let i = 0; i < digits.length;) {
						const n = Math.min(digits.length - i, 3);
						appendBits(parseInt(digits.substring(i, i + n), 10), n * 3 + 1, bb);
						i += n;
					}
					return new _QrSegment(_QrSegment.Mode.NUMERIC, digits.length, bb);
				}
				static makeAlphanumeric(text) {
					if (!_QrSegment.isAlphanumeric(text)) throw new RangeError("String contains unencodable characters in alphanumeric mode");
					let bb = [];
					let i;
					for (i = 0; i + 2 <= text.length; i += 2) {
						let temp = _QrSegment.ALPHANUMERIC_CHARSET.indexOf(text.charAt(i)) * 45;
						temp += _QrSegment.ALPHANUMERIC_CHARSET.indexOf(text.charAt(i + 1));
						appendBits(temp, 11, bb);
					}
					if (i < text.length) appendBits(_QrSegment.ALPHANUMERIC_CHARSET.indexOf(text.charAt(i)), 6, bb);
					return new _QrSegment(_QrSegment.Mode.ALPHANUMERIC, text.length, bb);
				}
				static makeSegments(text) {
					if (text == "") return [];
					else if (_QrSegment.isNumeric(text)) return [_QrSegment.makeNumeric(text)];
					else if (_QrSegment.isAlphanumeric(text)) return [_QrSegment.makeAlphanumeric(text)];
					else return [_QrSegment.makeBytes(_QrSegment.toUtf8ByteArray(text))];
				}
				static makeEci(assignVal) {
					let bb = [];
					if (assignVal < 0) throw new RangeError("ECI assignment value out of range");
					else if (assignVal < 128) appendBits(assignVal, 8, bb);
					else if (assignVal < 16384) {
						appendBits(2, 2, bb);
						appendBits(assignVal, 14, bb);
					} else if (assignVal < 1e6) {
						appendBits(6, 3, bb);
						appendBits(assignVal, 21, bb);
					} else throw new RangeError("ECI assignment value out of range");
					return new _QrSegment(_QrSegment.Mode.ECI, 0, bb);
				}
				static isNumeric(text) {
					return _QrSegment.NUMERIC_REGEX.test(text);
				}
				static isAlphanumeric(text) {
					return _QrSegment.ALPHANUMERIC_REGEX.test(text);
				}
				getData() {
					return this.bitData.slice();
				}
				static getTotalBits(segs, version) {
					let result = 0;
					for (const seg of segs) {
						const ccbits = seg.mode.numCharCountBits(version);
						if (seg.numChars >= 1 << ccbits) return Infinity;
						result += 4 + ccbits + seg.bitData.length;
					}
					return result;
				}
				static toUtf8ByteArray(str) {
					str = encodeURI(str);
					let result = [];
					for (let i = 0; i < str.length; i++) if (str.charAt(i) != "%") result.push(str.charCodeAt(i));
					else {
						result.push(parseInt(str.substring(i + 1, i + 3), 16));
						i += 2;
					}
					return result;
				}
			};
			_QrSegment.NUMERIC_REGEX = /^[0-9]*$/;
			_QrSegment.ALPHANUMERIC_REGEX = /^[A-Z0-9 $%*+.\/:-]*$/;
			_QrSegment.ALPHANUMERIC_CHARSET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:";
			let QrSegment = _QrSegment;
			qrcodegen2.QrSegment = _QrSegment;
		})(qrcodegen || (qrcodegen = {}));
		((qrcodegen2) => {
			((QrCode2) => {
				const _Ecc = class _Ecc {
					constructor(ordinal, formatBits) {
						this.ordinal = ordinal;
						this.formatBits = formatBits;
					}
				};
				_Ecc.LOW = new _Ecc(0, 1);
				_Ecc.MEDIUM = new _Ecc(1, 0);
				_Ecc.QUARTILE = new _Ecc(2, 3);
				_Ecc.HIGH = new _Ecc(3, 2);
				QrCode2.Ecc = _Ecc;
			})(qrcodegen2.QrCode || (qrcodegen2.QrCode = {}));
		})(qrcodegen || (qrcodegen = {}));
		((qrcodegen2) => {
			((QrSegment2) => {
				const _Mode = class _Mode {
					constructor(modeBits, numBitsCharCount) {
						this.modeBits = modeBits;
						this.numBitsCharCount = numBitsCharCount;
					}
					numCharCountBits(ver) {
						return this.numBitsCharCount[Math.floor((ver + 7) / 17)];
					}
				};
				_Mode.NUMERIC = new _Mode(1, [
					10,
					12,
					14
				]);
				_Mode.ALPHANUMERIC = new _Mode(2, [
					9,
					11,
					13
				]);
				_Mode.BYTE = new _Mode(4, [
					8,
					16,
					16
				]);
				_Mode.KANJI = new _Mode(8, [
					8,
					10,
					12
				]);
				_Mode.ECI = new _Mode(7, [
					0,
					0,
					0
				]);
				QrSegment2.Mode = _Mode;
			})(qrcodegen2.QrSegment || (qrcodegen2.QrSegment = {}));
		})(qrcodegen || (qrcodegen = {}));
		var qrcodegen_default = qrcodegen;
		/**
		* @license qrcode.react
		* Copyright (c) Paul O'Shannessy
		* SPDX-License-Identifier: ISC
		*/
		var ERROR_LEVEL_MAP = {
			L: qrcodegen_default.QrCode.Ecc.LOW,
			M: qrcodegen_default.QrCode.Ecc.MEDIUM,
			Q: qrcodegen_default.QrCode.Ecc.QUARTILE,
			H: qrcodegen_default.QrCode.Ecc.HIGH
		};
		var DEFAULT_SIZE = 128;
		var DEFAULT_LEVEL = "L";
		var DEFAULT_BGCOLOR = "#FFFFFF";
		var DEFAULT_FGCOLOR = "#000000";
		var DEFAULT_INCLUDEMARGIN = false;
		var DEFAULT_MINVERSION = 1;
		var SPEC_MARGIN_SIZE = 4;
		var DEFAULT_MARGIN_SIZE = 0;
		var DEFAULT_IMG_SCALE = .1;
		function generatePath(modules, margin = 0) {
			const ops = [];
			modules.forEach(function(row, y) {
				let start = null;
				row.forEach(function(cell, x) {
					if (!cell && start !== null) {
						ops.push(`M${start + margin} ${y + margin}h${x - start}v1H${start + margin}z`);
						start = null;
						return;
					}
					if (x === row.length - 1) {
						if (!cell) return;
						if (start === null) ops.push(`M${x + margin},${y + margin} h1v1H${x + margin}z`);
						else ops.push(`M${start + margin},${y + margin} h${x + 1 - start}v1H${start + margin}z`);
						return;
					}
					if (cell && start === null) start = x;
				});
			});
			return ops.join("");
		}
		function excavateModules(modules, excavation) {
			return modules.slice().map((row, y) => {
				if (y < excavation.y || y >= excavation.y + excavation.h) return row;
				return row.map((cell, x) => {
					if (x < excavation.x || x >= excavation.x + excavation.w) return cell;
					return false;
				});
			});
		}
		function getImageSettings(cells, size, margin, imageSettings) {
			if (imageSettings == null) return null;
			const numCells = cells.length + margin * 2;
			const defaultSize = Math.floor(size * DEFAULT_IMG_SCALE);
			const scale = numCells / size;
			const w = (imageSettings.width || defaultSize) * scale;
			const h = (imageSettings.height || defaultSize) * scale;
			const x = imageSettings.x == null ? cells.length / 2 - w / 2 : imageSettings.x * scale;
			const y = imageSettings.y == null ? cells.length / 2 - h / 2 : imageSettings.y * scale;
			const opacity = imageSettings.opacity == null ? 1 : imageSettings.opacity;
			let excavation = null;
			if (imageSettings.excavate) {
				let floorX = Math.floor(x);
				let floorY = Math.floor(y);
				excavation = {
					x: floorX,
					y: floorY,
					w: Math.ceil(w + x - floorX),
					h: Math.ceil(h + y - floorY)
				};
			}
			const crossOrigin = imageSettings.crossOrigin;
			return {
				x,
				y,
				h,
				w,
				excavation,
				opacity,
				crossOrigin
			};
		}
		function getMarginSize(includeMargin, marginSize) {
			if (marginSize != null) return Math.max(Math.floor(marginSize), 0);
			return includeMargin ? SPEC_MARGIN_SIZE : DEFAULT_MARGIN_SIZE;
		}
		function useQRCode({ value, level, minVersion, includeMargin, marginSize, imageSettings, size, boostLevel }) {
			let qrcode = react.default.useMemo(() => {
				const segments = (Array.isArray(value) ? value : [value]).reduce((accum, v) => {
					accum.push(...qrcodegen_default.QrSegment.makeSegments(v));
					return accum;
				}, []);
				return qrcodegen_default.QrCode.encodeSegments(segments, ERROR_LEVEL_MAP[level], minVersion, void 0, void 0, boostLevel);
			}, [
				value,
				level,
				minVersion,
				boostLevel
			]);
			const { cells, margin, numCells, calculatedImageSettings } = react.default.useMemo(() => {
				let cells2 = qrcode.getModules();
				const margin2 = getMarginSize(includeMargin, marginSize);
				return {
					cells: cells2,
					margin: margin2,
					numCells: cells2.length + margin2 * 2,
					calculatedImageSettings: getImageSettings(cells2, size, margin2, imageSettings)
				};
			}, [
				qrcode,
				size,
				imageSettings,
				includeMargin,
				marginSize
			]);
			return {
				qrcode,
				margin,
				cells,
				numCells,
				calculatedImageSettings
			};
		}
		var SUPPORTS_PATH2D = function() {
			try {
				new Path2D().addPath(new Path2D());
			} catch (e) {
				return false;
			}
			return true;
		}();
		var QRCodeCanvas = react.default.forwardRef(function QRCodeCanvas2(props, forwardedRef) {
			const _a = props, { value, size = DEFAULT_SIZE, level = DEFAULT_LEVEL, bgColor = DEFAULT_BGCOLOR, fgColor = DEFAULT_FGCOLOR, includeMargin = DEFAULT_INCLUDEMARGIN, minVersion = DEFAULT_MINVERSION, boostLevel, marginSize, imageSettings } = _a;
			const _b = __objRest(_a, [
				"value",
				"size",
				"level",
				"bgColor",
				"fgColor",
				"includeMargin",
				"minVersion",
				"boostLevel",
				"marginSize",
				"imageSettings"
			]), { style } = _b, otherProps = __objRest(_b, ["style"]);
			const imgSrc = imageSettings == null ? void 0 : imageSettings.src;
			const _canvas = react.default.useRef(null);
			const _image = react.default.useRef(null);
			const setCanvasRef = react.default.useCallback((node) => {
				_canvas.current = node;
				if (typeof forwardedRef === "function") forwardedRef(node);
				else if (forwardedRef) forwardedRef.current = node;
			}, [forwardedRef]);
			const [isImgLoaded, setIsImageLoaded] = react.default.useState(false);
			const { margin, cells, numCells, calculatedImageSettings } = useQRCode({
				value,
				level,
				minVersion,
				boostLevel,
				includeMargin,
				marginSize,
				imageSettings,
				size
			});
			react.default.useEffect(() => {
				if (_canvas.current != null) {
					const canvas = _canvas.current;
					const ctx = canvas.getContext("2d");
					if (!ctx) return;
					let cellsToDraw = cells;
					const image = _image.current;
					const haveImageToRender = calculatedImageSettings != null && image !== null && image.complete && image.naturalHeight !== 0 && image.naturalWidth !== 0;
					if (haveImageToRender) {
						if (calculatedImageSettings.excavation != null) cellsToDraw = excavateModules(cells, calculatedImageSettings.excavation);
					}
					const pixelRatio = window.devicePixelRatio || 1;
					canvas.height = canvas.width = size * pixelRatio;
					const scale = size / numCells * pixelRatio;
					ctx.scale(scale, scale);
					ctx.fillStyle = bgColor;
					ctx.fillRect(0, 0, numCells, numCells);
					ctx.fillStyle = fgColor;
					if (SUPPORTS_PATH2D) ctx.fill(new Path2D(generatePath(cellsToDraw, margin)));
					else cells.forEach(function(row, rdx) {
						row.forEach(function(cell, cdx) {
							if (cell) ctx.fillRect(cdx + margin, rdx + margin, 1, 1);
						});
					});
					if (calculatedImageSettings) ctx.globalAlpha = calculatedImageSettings.opacity;
					if (haveImageToRender) ctx.drawImage(image, calculatedImageSettings.x + margin, calculatedImageSettings.y + margin, calculatedImageSettings.w, calculatedImageSettings.h);
				}
			});
			react.default.useEffect(() => {
				setIsImageLoaded(false);
			}, [imgSrc]);
			const canvasStyle = __spreadValues({
				height: size,
				width: size
			}, style);
			let img = null;
			if (imgSrc != null) img = /* @__PURE__ */ react.default.createElement("img", {
				src: imgSrc,
				key: imgSrc,
				style: { display: "none" },
				onLoad: () => {
					setIsImageLoaded(true);
				},
				ref: _image,
				crossOrigin: calculatedImageSettings == null ? void 0 : calculatedImageSettings.crossOrigin
			});
			return /* @__PURE__ */ react.default.createElement(react.default.Fragment, null, /* @__PURE__ */ react.default.createElement("canvas", __spreadValues({
				style: canvasStyle,
				height: size,
				width: size,
				ref: setCanvasRef,
				role: "img"
			}, otherProps)), img);
		});
		QRCodeCanvas.displayName = "QRCodeCanvas";
		var QRCodeSVG = react.default.forwardRef(function QRCodeSVG2(props, forwardedRef) {
			const _a = props, { value, size = DEFAULT_SIZE, level = DEFAULT_LEVEL, bgColor = DEFAULT_BGCOLOR, fgColor = DEFAULT_FGCOLOR, includeMargin = DEFAULT_INCLUDEMARGIN, minVersion = DEFAULT_MINVERSION, boostLevel, title, marginSize, imageSettings } = _a, otherProps = __objRest(_a, [
				"value",
				"size",
				"level",
				"bgColor",
				"fgColor",
				"includeMargin",
				"minVersion",
				"boostLevel",
				"title",
				"marginSize",
				"imageSettings"
			]);
			const { margin, cells, numCells, calculatedImageSettings } = useQRCode({
				value,
				level,
				minVersion,
				boostLevel,
				includeMargin,
				marginSize,
				imageSettings,
				size
			});
			let cellsToDraw = cells;
			let image = null;
			if (imageSettings != null && calculatedImageSettings != null) {
				if (calculatedImageSettings.excavation != null) cellsToDraw = excavateModules(cells, calculatedImageSettings.excavation);
				image = /* @__PURE__ */ react.default.createElement("image", {
					href: imageSettings.src,
					height: calculatedImageSettings.h,
					width: calculatedImageSettings.w,
					x: calculatedImageSettings.x + margin,
					y: calculatedImageSettings.y + margin,
					preserveAspectRatio: "none",
					opacity: calculatedImageSettings.opacity,
					crossOrigin: calculatedImageSettings.crossOrigin
				});
			}
			const fgPath = generatePath(cellsToDraw, margin);
			return /* @__PURE__ */ react.default.createElement("svg", __spreadValues({
				height: size,
				width: size,
				viewBox: `0 0 ${numCells} ${numCells}`,
				ref: forwardedRef,
				role: "img"
			}, otherProps), !!title && /* @__PURE__ */ react.default.createElement("title", null, title), /* @__PURE__ */ react.default.createElement("path", {
				fill: bgColor,
				d: `M0,0 h${numCells}v${numCells}H0z`,
				shapeRendering: "crispEdges"
			}), /* @__PURE__ */ react.default.createElement("path", {
				fill: fgColor,
				d: fgPath,
				shapeRendering: "crispEdges"
			}), image);
		});
		QRCodeSVG.displayName = "QRCodeSVG";
		//#endregion
		//#region src/client/pair-api.ts
		/**
		* Mint a fresh pairing token (one active token at a time — this invalidates
		* any previous link).
		* @param workspaceId - optional current workspace to deep-link the phone into.
		* @param address - optional LAN IP literal the QR must be built from (the
		* default is the first interface); unknown literals refuse with
		* 'unknown-address'.
		* @returns the issued link, the lan-required refusal (server never bound
		* 0.0.0.0), or the forbidden refusal (the loopback-only fence rejected this
		* origin — the panel is a desktop control endpoint).
		*/
		async function issuePair(workspaceId, address) {
			const response = await fetch("/api/pair/issue", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					...workspaceId !== void 0 ? { workspaceId } : {},
					...address !== void 0 ? { address } : {}
				})
			});
			if (!response.ok) {
				if (response.status === 409) return {
					ok: false,
					code: "lan-required"
				};
				if (response.status === 403) return {
					ok: false,
					code: "forbidden"
				};
				if (response.status === 400) return {
					ok: false,
					code: "unknown-address"
				};
				throw new Error(`remote-web-ui: issue failed with ${String(response.status)}`);
			}
			return await response.json();
		}
		/**
		* Accept a pairing token (the phone's first open of the QR link). Success
		* sets the device cookie; the page then reloads to boot with it.
		* @param token - the token from the URL.
		* @returns the wire result.
		*/
		async function acceptPair(token) {
			const response = await fetch("/api/pair/accept", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({ token })
			});
			if (response.ok) return { ok: true };
			if (response.status === 404) return {
				ok: false,
				code: "invalid"
			};
			if (response.status === 409) return {
				ok: false,
				code: "used"
			};
			return {
				ok: false,
				code: "forbidden"
			};
		}
		/** Revoke mobile access (paired devices + the current token). */
		async function stopPair() {
			const response = await fetch("/api/pair/stop", { method: "POST" });
			if (!response.ok) throw new Error(`remote-web-ui: stop failed with ${String(response.status)}`);
		}
		/** Presence heartbeat from a paired phone (unpaired heartbeats 401 harmlessly). */
		async function sendHeartbeat() {
			await fetch("/api/pair/heartbeat", { method: "POST" });
		}
		/** Whether the current page URL carries a pairing token / workspace target. */
		function readPairParams(search) {
			const params = new URLSearchParams(search);
			const pair = params.get("pair");
			const workspace = params.get("workspace");
			return {
				...pair !== null && pair !== "" ? { pair } : {},
				...workspace !== null && workspace !== "" ? { workspace } : {}
			};
		}
		function formatClock(epochMs) {
			const date = new Date(epochMs);
			return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
		}
		/**
		* Copy text to the clipboard with a fallback for insecure contexts
		* (plain-HTTP LAN origins lack navigator.clipboard).
		* @param text - the text to copy.
		* @returns whether the copy succeeded.
		*/
		async function copyText(text) {
			if (typeof navigator !== "undefined" && navigator.clipboard !== void 0) try {
				await navigator.clipboard.writeText(text);
				return true;
			} catch {}
			try {
				const area = document.createElement("textarea");
				area.value = text;
				area.style.position = "fixed";
				area.style.opacity = "0";
				document.body.appendChild(area);
				area.select();
				const ok = document.execCommand("copy");
				area.remove();
				return ok;
			} catch {
				return false;
			}
		}
		//#endregion
		//#region \0dsh-css:packages/dsh-remote-web-ui/src/client/remote.module.css.mjs
		const css$1 = ".fThDlq_overlay{z-index:1000;justify-content:center;align-items:center;display:flex;position:fixed;inset:0}.fThDlq_mask{background:var(--dsw-alias-bg-mask-1);backdrop-filter:var(--dsw-mask-blur);position:absolute;inset:0}.fThDlq_trigger{width:36px;height:36px;color:var(--dsw-alias-label-secondary);cursor:pointer;background:0 0;border:none;border-radius:50%;flex:none;justify-content:center;align-items:center;padding:0;transition:background-color .12s,color .12s,box-shadow .12s;display:inline-flex}.fThDlq_trigger:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}.fThDlq_trigger:active:not(:disabled){background:var(--dsw-alias-interactive-bg-active)}.fThDlq_trigger:focus-visible{box-shadow:0 0 0 2px var(--dsw-alias-bg-layer-2), 0 0 0 4px var(--dsw-alias-brand-primary);outline:none}.fThDlq_trigger:disabled{opacity:.5;cursor:default}.fThDlq_panel{z-index:1;box-sizing:border-box;background:var(--dsw-alias-bg-layer-2);width:560px;max-width:calc(100vw - 48px);max-height:calc(100vh - 48px);box-shadow:var(--dsw-shadow-lv3);color:var(--dsw-alias-label-primary);border-radius:24px;flex-direction:column;gap:14px;padding:24px;font-size:14px;line-height:22px;display:flex;position:relative;overflow:auto}.fThDlq_header{align-items:flex-start;gap:12px;display:flex}.fThDlq_heading{flex:1;min-width:0}.fThDlq_title{margin:0;font-size:18px;font-weight:600;line-height:26px}.fThDlq_subtitle{color:var(--dsw-alias-label-secondary);margin:4px 0 0;font-size:13px}.fThDlq_close{width:28px;height:28px;color:var(--dsw-alias-label-secondary);cursor:pointer;background:0 0;border:none;border-radius:50%;flex:none;justify-content:center;align-items:center;padding:0;transition:background-color .12s,color .12s,box-shadow .12s;display:inline-flex}.fThDlq_close:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover)}.fThDlq_close:active:not(:disabled){background:var(--dsw-alias-interactive-bg-active)}.fThDlq_close:focus-visible{box-shadow:0 0 0 2px var(--dsw-alias-bg-layer-2), 0 0 0 4px var(--dsw-alias-brand-primary);outline:none}.fThDlq_close:disabled{opacity:.5;cursor:default}.fThDlq_card{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);border-radius:16px;flex-direction:column;align-items:center;gap:12px;padding:16px;display:flex}.fThDlq_cardHeader{justify-content:space-between;align-items:center;gap:12px;width:100%;display:flex}.fThDlq_cardTitle{font-weight:500}.fThDlq_badge{white-space:nowrap;border-radius:999px;flex:none;align-items:center;gap:6px;min-width:0;padding:2px 10px;font-size:12px;line-height:18px;display:inline-flex}.fThDlq_badge:before{content:\"\";background:currentColor;border-radius:50%;width:8px;height:8px}.fThDlq_badge-waiting{color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-interactive-bg-hover)}.fThDlq_badge-connected{color:var(--dsw-alias-state-success-primary);background:var(--dsw-alias-interactive-bg-hover)}.fThDlq_badge-disconnected{color:var(--dsw-alias-state-warn-primary);background:var(--dsw-alias-interactive-bg-hover)}.fThDlq_badge-stopped{color:var(--dsw-alias-state-error-primary);background:var(--dsw-alias-interactive-bg-hover)}.fThDlq_badgePublic{color:var(--dsw-alias-brand-primary);background:var(--dsw-alias-interactive-bg-hover)}.fThDlq_badges{flex:none;align-items:center;gap:6px;display:inline-flex}.fThDlq_qrWrap{background:var(--dsw-alias-bg-base);border-radius:12px;justify-content:center;align-items:center;padding:12px;display:flex}.fThDlq_qr{display:block}.fThDlq_expired{color:var(--dsw-alias-state-error-primary);margin:0;font-size:13px}.fThDlq_expiry{color:var(--dsw-alias-label-secondary);margin:0;font-size:12px}.fThDlq_hint{color:var(--dsw-alias-label-secondary);margin:0;font-size:13px}.fThDlq_link{text-overflow:ellipsis;white-space:nowrap;color:var(--dsw-alias-label-caption);font-family:var(--dsw-font-mono,ui-monospace, monospace);margin:0;font-size:12px;overflow:hidden}.fThDlq_stoppedHint{color:var(--dsw-alias-state-error-primary);margin:0;font-size:13px}.fThDlq_tunnelNote{color:var(--dsw-alias-label-secondary);margin:0;font-size:13px}.fThDlq_tunnelFailed{color:var(--dsw-alias-state-error-primary);margin:0;font-size:13px}.fThDlq_actions{gap:8px;display:flex}.fThDlq_action{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-button-elevated-fill);height:34px;color:var(--dsw-alias-label-primary);cursor:pointer;white-space:nowrap;border-radius:10px;justify-content:center;align-items:center;gap:6px;padding:0 14px;font-size:13px;transition:background-color .12s,border-color .12s,box-shadow .12s;display:inline-flex}.fThDlq_action:hover:not(:disabled){background:var(--dsw-alias-button-floating-hover)}.fThDlq_action:active:not(:disabled){background:var(--dsw-alias-interactive-bg-active)}.fThDlq_action:focus-visible{box-shadow:0 0 0 2px var(--dsw-alias-bg-layer-2), 0 0 0 4px var(--dsw-alias-brand-primary);outline:none}.fThDlq_action:disabled{opacity:.5;cursor:default}.fThDlq_banner{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);border-radius:16px;padding:16px}.fThDlq_bannerTitle{color:var(--dsw-alias-state-warn-primary);margin:0;font-weight:500}.fThDlq_bannerHint{color:var(--dsw-alias-label-secondary);margin:6px 0 0;font-size:13px}.fThDlq_notice{z-index:2000;box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-2);max-width:min(420px,100vw - 32px);box-shadow:var(--dsw-shadow-lv3);border-radius:12px;padding:12px 16px;position:fixed;top:16px;left:50%;transform:translate(-50%)}.fThDlq_noticeTitle{color:var(--dsw-alias-state-error-primary);margin:0;font-weight:500}.fThDlq_noticeDetail{color:var(--dsw-alias-label-secondary);margin:4px 0 0;font-size:13px}.fThDlq_addresses{border:none;margin:12px 0 0;padding:0}.fThDlq_addresses legend{color:var(--dsw-alias-label-secondary);padding:0;font-size:13px}.fThDlq_address{color:var(--dsw-alias-label-primary);font-variant-numeric:tabular-nums;cursor:pointer;border-radius:6px;align-items:center;gap:8px;margin-top:6px;padding:4px 6px;font-size:13px;transition:background-color .12s;display:flex}.fThDlq_address:hover{background:var(--dsw-alias-interactive-bg-hover)}.fThDlq_address input:focus-visible{box-shadow:0 0 0 2px var(--dsw-alias-bg-layer-2), 0 0 0 4px var(--dsw-alias-brand-primary);border-radius:50%;outline:none}.fThDlq_addressValue{text-overflow:ellipsis;white-space:nowrap;min-width:0;color:var(--dsw-alias-label-secondary);flex:1;font-size:12px;overflow:hidden}.fThDlq_addressHint{color:var(--dsw-alias-label-tertiary);margin:6px 0 0;font-size:12px}@media (prefers-reduced-motion:reduce){.fThDlq_trigger,.fThDlq_close,.fThDlq_action,.fThDlq_address{transition:none}}.fThDlq_entryRow{flex:none;align-items:center;gap:6px;display:flex}.fThDlq_entryRow[data-rail=rail]{flex-direction:column-reverse;gap:4px}.fThDlq_updateStatus{margin:0;font-weight:600}.fThDlq_updateDetail{color:var(--dsw-alias-label-secondary);margin:6px 0 0;font-size:13px}.fThDlq_updateError{color:var(--dsw-alias-text-danger,var(--dsw-alias-label-primary));margin:0;font-weight:600}.fThDlq_updateOutput{background:var(--dsw-alias-bg-layer-1);max-height:180px;color:var(--dsw-alias-label-secondary);white-space:pre-wrap;word-break:break-all;border-radius:10px;margin:10px 0 0;padding:10px 12px;font-size:12px;line-height:18px;overflow:auto}.fThDlq_updateList{flex-direction:column;gap:6px;margin:12px 0 0;padding:0;list-style:none;display:flex}.fThDlq_updateListItem{justify-content:space-between;align-items:baseline;gap:12px;font-size:13px;display:flex}.fThDlq_updateListName{text-overflow:ellipsis;white-space:nowrap;min-width:0;color:var(--dsw-alias-label-primary);overflow:hidden}.fThDlq_updateListVersions{color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums;flex:none}.fThDlq_updateActions{justify-content:flex-end;margin-top:16px;display:flex}.fThDlq_updateRetry{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary);cursor:pointer;border:none;border-radius:10px;align-items:center;gap:6px;padding:8px 14px;font-size:13px;transition:background-color .12s,color .12s;display:inline-flex}.fThDlq_updateRetry:hover{background:var(--dsw-alias-interactive-bg-active)}@media (prefers-reduced-motion:reduce){.fThDlq_updateRetry{transition:none}}";
		const tagId$1 = "@linxin666/dsh-remote-web-ui/remote.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$1) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@linxin666/dsh-remote-web-ui";
			tag.dataset.pluginCss = tagId$1;
			tag.textContent = css$1;
			document.head.appendChild(tag);
		}
		var remote_module_css_default = {
			"action": "fThDlq_action",
			"actions": "fThDlq_actions",
			"address": "fThDlq_address",
			"addressHint": "fThDlq_addressHint",
			"addressValue": "fThDlq_addressValue",
			"addresses": "fThDlq_addresses",
			"badge": "fThDlq_badge",
			"badge-connected": "fThDlq_badge-connected",
			"badge-disconnected": "fThDlq_badge-disconnected",
			"badge-stopped": "fThDlq_badge-stopped",
			"badge-waiting": "fThDlq_badge-waiting",
			"badgePublic": "fThDlq_badgePublic",
			"badges": "fThDlq_badges",
			"banner": "fThDlq_banner",
			"bannerHint": "fThDlq_bannerHint",
			"bannerTitle": "fThDlq_bannerTitle",
			"card": "fThDlq_card",
			"cardHeader": "fThDlq_cardHeader",
			"cardTitle": "fThDlq_cardTitle",
			"close": "fThDlq_close",
			"entryRow": "fThDlq_entryRow",
			"expired": "fThDlq_expired",
			"expiry": "fThDlq_expiry",
			"header": "fThDlq_header",
			"heading": "fThDlq_heading",
			"hint": "fThDlq_hint",
			"link": "fThDlq_link",
			"mask": "fThDlq_mask",
			"notice": "fThDlq_notice",
			"noticeDetail": "fThDlq_noticeDetail",
			"noticeTitle": "fThDlq_noticeTitle",
			"overlay": "fThDlq_overlay",
			"panel": "fThDlq_panel",
			"qr": "fThDlq_qr",
			"qrWrap": "fThDlq_qrWrap",
			"stoppedHint": "fThDlq_stoppedHint",
			"subtitle": "fThDlq_subtitle",
			"title": "fThDlq_title",
			"trigger": "fThDlq_trigger",
			"tunnelFailed": "fThDlq_tunnelFailed",
			"tunnelNote": "fThDlq_tunnelNote",
			"updateActions": "fThDlq_updateActions",
			"updateDetail": "fThDlq_updateDetail",
			"updateError": "fThDlq_updateError",
			"updateList": "fThDlq_updateList",
			"updateListItem": "fThDlq_updateListItem",
			"updateListName": "fThDlq_updateListName",
			"updateListVersions": "fThDlq_updateListVersions",
			"updateOutput": "fThDlq_updateOutput",
			"updateRetry": "fThDlq_updateRetry",
			"updateStatus": "fThDlq_updateStatus"
		};
		//#endregion
		//#region src/client/RemotePanel.tsx
		/**
		* The mobile remote-control panel body: status card (state text + badge),
		* the QR code, the open-on-phone hint with the link text, and the three
		* actions (stop / refresh / copy). Pure presentation — all state and
		* actions arrive through props from the entry's behavior component.
		*/
		/** Badge text + tone per phase (ready states only). */
		function statusOf(t, state) {
			switch (state.phase) {
				case "connected": return {
					text: t("status.connected", { n: state.onlineCount }),
					tone: "connected"
				};
				case "disconnected": return {
					text: t("status.disconnected"),
					tone: "disconnected"
				};
				case "stopped": return {
					text: t("status.stopped"),
					tone: "stopped"
				};
				case "lan-required": return {
					text: t("status.lanRequired"),
					tone: "stopped"
				};
				case "waiting": return {
					text: t("status.waiting"),
					tone: "waiting"
				};
			}
		}
		/**
		* Render the pairing panel.
		* @param props - copy, state, and actions.
		* @returns the panel element tree.
		*/
		function RemotePanel({ t, state, copied, onClose, onStop, onRefresh, onCopy, onPickAddress, onPickPublic }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: remote_module_css_default.panel,
				role: "dialog",
				"aria-modal": "true",
				"aria-label": t("title"),
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: remote_module_css_default.header,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: remote_module_css_default.heading,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", {
							className: remote_module_css_default.title,
							children: t("title")
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							className: remote_module_css_default.subtitle,
							children: t("subtitle")
						})]
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
						type: "button",
						className: remote_module_css_default.close,
						"aria-label": t("close.label"),
						onClick: onClose,
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconCloseOutline16, { size: 14 })
					})]
				}), state.kind === "lan-required" ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: remote_module_css_default.banner,
					role: "alert",
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: remote_module_css_default.bannerTitle,
						children: t("status.lanRequired")
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: remote_module_css_default.bannerHint,
						children: t("status.lanRequiredHint")
					})]
				}) : state.kind === "loopback-required" ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: remote_module_css_default.banner,
					role: "alert",
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: remote_module_css_default.bannerTitle,
						children: t("status.loopbackRequired")
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: remote_module_css_default.bannerHint,
						children: t("status.loopbackRequiredHint")
					})]
				}) : state.kind === "unreachable" ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: remote_module_css_default.banner,
					role: "alert",
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: remote_module_css_default.bannerTitle,
						children: t("status.unreachable")
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: remote_module_css_default.bannerHint,
						children: t("status.unreachableHint")
					})]
				}) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: remote_module_css_default.card,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: remote_module_css_default.cardHeader,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: remote_module_css_default.cardTitle,
									children: t("card.title")
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
									className: remote_module_css_default.badges,
									children: [state.public && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: clsx(remote_module_css_default.badge, remote_module_css_default.badgePublic),
										children: t("public.badge")
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: clsx(remote_module_css_default.badge, remote_module_css_default[`badge-${statusOf(t, state).tone}`]),
										children: statusOf(t, state).text
									})]
								})]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: remote_module_css_default.qrWrap,
								"data-testid": "remote-qr",
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(QRCodeSVG, {
									value: state.url,
									size: 184,
									level: "M",
									marginSize: 1,
									className: remote_module_css_default.qr
								})
							}),
							state.expired ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
								className: remote_module_css_default.expired,
								children: t("pair.expired")
							}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
								className: remote_module_css_default.expiry,
								children: t("pair.expires", { time: formatClock(state.expiresAt) })
							})
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: remote_module_css_default.hint,
						children: state.public ? t("pair.publicHint") : t("pair.hint")
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: remote_module_css_default.link,
						title: state.url,
						children: state.url
					}),
					state.phase === "stopped" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: remote_module_css_default.stoppedHint,
						children: t("stopped.hint")
					}),
					state.tunnel !== void 0 && state.tunnel.state !== "running" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: state.tunnel.state === "failed" ? remote_module_css_default.tunnelFailed : remote_module_css_default.tunnelNote,
						role: "status",
						children: state.tunnel.state === "failed" ? t("tunnel.failed", { error: state.tunnel.error ?? t("tunnel.unknownError") }) : t("tunnel.starting")
					}),
					(state.publicBaseUrl !== void 0 || state.lanAddresses.length > 1) && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("fieldset", {
						className: remote_module_css_default.addresses,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("legend", { children: t("address.label") }),
							state.publicBaseUrl !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
								className: remote_module_css_default.address,
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
										type: "radio",
										name: "lan-address",
										"aria-label": t("address.public"),
										checked: state.public,
										onChange: onPickPublic
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("address.public") }),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("code", {
										className: remote_module_css_default.addressValue,
										children: state.publicBaseUrl
									})
								]
							}, "public"),
							state.lanAddresses.map((address) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
								className: remote_module_css_default.address,
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
										type: "radio",
										name: "lan-address",
										"aria-label": address,
										checked: !state.public && address === state.address,
										onChange: () => onPickAddress(address)
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("address.lan") }),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("code", {
										className: remote_module_css_default.addressValue,
										children: address
									})
								]
							}, address)),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
								className: remote_module_css_default.addressHint,
								children: t("address.hint")
							})
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: remote_module_css_default.actions,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
								type: "button",
								className: remote_module_css_default.action,
								onClick: onStop,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconStopFill16, { size: 14 }), t("action.stop")]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
								type: "button",
								className: remote_module_css_default.action,
								onClick: onRefresh,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconRefreshOutline16, { size: 14 }), t("action.refresh")]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
								type: "button",
								className: remote_module_css_default.action,
								onClick: onCopy,
								children: [copied ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconCopyOutline16, { size: 14 }) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconLinkOutline16, { size: 14 }), copied ? t("action.copied") : t("action.copy")]
							})
						]
					})
				] })]
			});
		}
		//#endregion
		//#region src/client/PhoneIcon.tsx
		/**
		* Render the phone icon.
		* @param props - size and optional class.
		* @returns the svg element.
		*/
		function PhoneIcon({ size = 16, className }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
				width: size,
				height: size,
				className,
				viewBox: "0 0 16 16",
				fill: "none",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
					d: "M4.2 1.8h2.4l.9 2.4-1.5 1.1a7.4 7.4 0 0 0 4.7 4.7l1.1-1.5 2.4.9v2.4a.9.9 0 0 1-1 .9A11.4 11.4 0 0 1 3.3 2.8a.9.9 0 0 1 .9-1Z",
					stroke: "currentColor",
					strokeWidth: "1.3",
					strokeLinejoin: "round"
				})
			});
		}
		//#endregion
		//#region src/client/update-api.ts
		/**
		* Error thrown when the update status probe fails: carries the HTTP status
		* so the panel can tell "the update route is not mounted" (404 — the host
		* process runs an older plugin build) apart from real network failures.
		*/
		var UpdateStatusError = class extends Error {
			/** HTTP status of the failed response (0 when the fetch never returned). */
			status;
			constructor(status) {
				super("update status unavailable (HTTP " + String(status) + ")");
				this.status = status;
			}
		};
		/**
		* Probe the update status: install mode, owning profile, and the
		* current-vs-latest comparison for every family package.
		* @returns the status snapshot.
		*/
		async function fetchUpdateStatus() {
			let response;
			try {
				response = await fetch("/api/update/status");
			} catch {
				throw new UpdateStatusError(0);
			}
			if (!response.ok) throw new UpdateStatusError(response.status);
			return await response.json();
		}
		/**
		* Run the update (pnpm update in the owning profile). Blocks until pnpm
		* exits — the panel shows an in-flight state meanwhile.
		* @returns the run outcome.
		*/
		async function runUpdate() {
			const response = await fetch("/api/update/run", { method: "POST" });
			if (!response.ok) throw new Error("update run unavailable");
			return await response.json();
		}
		//#endregion
		//#region src/client/UpdatePanel.tsx
		/** The anchor package name (aggregate first) for copy purposes. */
		function anchorName(status) {
			return status?.anchor ?? status?.packages[0]?.name;
		}
		/** The latest npm release of the anchor, for reference copy. */
		function anchorLatest(status) {
			return status?.packages[0]?.latest;
		}
		/**
		* Render the update panel.
		* @param props - copy, view state, and actions.
		* @returns the panel element tree.
		*/
		function UpdatePanel({ t, view, onClose, onRecheck }) {
			const status = view.kind === "result" || view.kind === "updating" ? view.status : void 0;
			const title = view.kind === "done" && view.result.ok ? t("update.done") : t("update.title");
			const subtitle = subtitleOf(t, view);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: remote_module_css_default.panel,
				role: "dialog",
				"aria-modal": "true",
				"aria-label": title,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: remote_module_css_default.header,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: remote_module_css_default.heading,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", {
								className: remote_module_css_default.title,
								children: title
							}), subtitle !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
								className: remote_module_css_default.subtitle,
								children: subtitle
							})]
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							className: remote_module_css_default.close,
							"aria-label": t("update.close"),
							onClick: onClose,
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconCloseOutline16, {})
						})]
					}),
					view.kind === "checking" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: remote_module_css_default.updateStatus,
						children: t("update.checking")
					}),
					view.kind === "result" && status !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ResultBody, {
						t,
						status
					}),
					view.kind === "updating" && status !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: remote_module_css_default.updateStatus,
						children: t("update.updating", {
							name: anchorName(status) ?? "",
							version: anchorLatest(status) ?? ""
						})
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(PackageList, { status })] }),
					view.kind === "done" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DoneBody, {
						t,
						result: view.result
					}),
					view.kind === "error" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: remote_module_css_default.updateError,
						children: view.message
					}), view.detail !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("pre", {
						className: remote_module_css_default.updateOutput,
						children: view.detail
					})] }),
					(view.kind === "done" || view.kind === "error") && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: remote_module_css_default.updateActions,
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
							type: "button",
							className: remote_module_css_default.updateRetry,
							onClick: onRecheck,
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconRefreshOutline16, {}),
								" ",
								t("update.retry")
							]
						})
					})
				]
			});
		}
		/** The subtitle copy per view state (absent on plain results). */
		function subtitleOf(t, view) {
			switch (view.kind) {
				case "checking": return t("update.checking");
				case "updating": return t("update.updatingTitle");
				case "result": return;
				case "done": return view.result.ok ? t("update.doneDetail") : t("update.error");
				case "error": return;
			}
		}
		/** The checked result body: mode banner + version list. */
		function ResultBody({ t, status }) {
			const anchor = anchorName(status);
			const latest = anchorLatest(status);
			if (status.mode === "link") return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
				className: remote_module_css_default.updateStatus,
				children: t("update.linkMode")
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
				className: remote_module_css_default.updateDetail,
				children: t("update.linkModeDetail", { version: latest ?? "-" })
			})] });
			if (status.mode === "missing") return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
				className: remote_module_css_default.updateStatus,
				children: t("update.missing")
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
				className: remote_module_css_default.updateDetail,
				children: t("update.missingDetail")
			})] });
			if (status.error === "registry-unreachable") return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
				className: remote_module_css_default.updateStatus,
				children: t("update.offline")
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
				className: remote_module_css_default.updateDetail,
				children: t("update.offlineDetail")
			})] });
			if (status.outdated) return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
				className: remote_module_css_default.updateStatus,
				children: t("update.found")
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
				className: remote_module_css_default.updateDetail,
				children: anchor !== void 0 ? t("update.foundDetail", {
					name: anchor,
					version: latest ?? ""
				}) : ""
			})] });
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
					className: remote_module_css_default.updateStatus,
					children: t("update.upToDate")
				}),
				anchor !== void 0 && latest !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
					className: remote_module_css_default.updateDetail,
					children: t("update.upToDateDetail", {
						name: anchor,
						version: latest
					})
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(PackageList, { status })
			] });
		}
		/** The per-package current → latest comparison list. */
		function PackageList({ status }) {
			if (status.packages.length === 0) return null;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("ul", {
				className: remote_module_css_default.updateList,
				children: status.packages.map((packageStatus) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("li", {
					className: remote_module_css_default.updateListItem,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: remote_module_css_default.updateListName,
						children: packageStatus.name
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
						className: remote_module_css_default.updateListVersions,
						children: [packageStatus.current, packageStatus.latest !== void 0 && packageStatus.latest !== packageStatus.current && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [" → ", packageStatus.latest] })]
					})]
				}, packageStatus.name))
			});
		}
		/** The outcome body: success + restart hint, or the translated failure. */
		function DoneBody({ t, result }) {
			if (result.ok) return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
				className: remote_module_css_default.updateDetail,
				children: t("update.doneDetail")
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
				className: remote_module_css_default.updateDetail,
				children: t("update.restartHint")
			})] });
			const message = errorMessageOf(t, result);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
				className: remote_module_css_default.updateError,
				children: message
			}), result.output.trim() !== "" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("pre", {
				className: remote_module_css_default.updateOutput,
				children: result.output.trim()
			})] });
		}
		/** Translate a structured failure code; fall back to the raw message. */
		function errorMessageOf(t, result) {
			switch (result.errorCode) {
				case "pnpm-missing": return t("update.error.pnpmMissing");
				case "timeout": return t("update.error.timeout");
				case "not-found": return t("update.error.notFound");
				case "link": return t("update.error.link");
				case "pnpm-failed": return t("update.error.pnpmFailed", { code: String(result.exitCode ?? "?") });
				case "stale": return t("update.error.stale");
				case "verify-failed": return t("update.error.verifyFailed");
				default: return result.error ?? t("update.error.unknown");
			}
		}
		//#endregion
		//#region src/client/UpdateEntry.tsx
		/**
		* The sidebar update seat: the download trigger beside the remote-control
		* trigger plus the update panel modal. Owns the flow — probe the registry
		* on open, auto-run the update when a newer release exists, report the
		* outcome (restart hint on success, translated failure on error).
		* Component-local state per the client stack rules.
		*/
		/**
		* Render the update trigger and panel.
		* @param props - column state and locale seat.
		* @returns the entry element tree.
		*/
		function UpdateEntry({ wide, t }) {
			const [open, setOpen] = (0, react.useState)(false);
			const [view, setView] = (0, react.useState)({ kind: "checking" });
			const runToken = (0, react.useRef)(0);
			const check = (0, react.useCallback)(async () => {
				setView({ kind: "checking" });
				let status;
				try {
					status = await fetchUpdateStatus();
				} catch (error) {
					if (error instanceof UpdateStatusError && error.status === 404) {
						setView({
							kind: "error",
							message: t("update.unmounted"),
							detail: t("update.unmountedDetail")
						});
						return;
					}
					setView({
						kind: "error",
						message: t("update.offline"),
						detail: t("update.offlineDetail")
					});
					return;
				}
				if (status.error === "registry-unreachable") {
					setView({
						kind: "result",
						status
					});
					return;
				}
				setView({
					kind: "result",
					status
				});
				if (status.mode !== "npm" || !status.outdated) return;
				setView({
					kind: "updating",
					status
				});
				const token = ++runToken.current;
				try {
					const result = await runUpdate();
					if (token !== runToken.current) return;
					setView({
						kind: "done",
						result
					});
				} catch {
					if (token !== runToken.current) return;
					setView({
						kind: "error",
						message: t("update.error"),
						detail: t("update.offlineDetail")
					});
				}
			}, [t]);
			const openPanel = (0, react.useCallback)(() => {
				setOpen(true);
				check();
			}, [check]);
			const closePanel = (0, react.useCallback)(() => {
				runToken.current++;
				setOpen(false);
			}, []);
			(0, react.useEffect)(() => () => {
				runToken.current++;
			}, []);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
				type: "button",
				className: remote_module_css_default.trigger,
				"data-wide": wide ? void 0 : "rail",
				"aria-label": t("update.label"),
				title: t("update.label"),
				onClick: openPanel,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconDownloadOutline16, { size: wide ? 16 : 18 })
			}), open && (0, react_dom.createPortal)(/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: remote_module_css_default.overlay,
				role: "presentation",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: remote_module_css_default.mask,
					"aria-hidden": "true",
					onClick: closePanel
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(UpdatePanel, {
					t,
					view,
					onClose: closePanel,
					onRecheck: () => {
						check();
					}
				})]
			}), document.body)] });
		}
		//#endregion
		//#region src/client/RemoteEntry.tsx
		/**
		* The sidebar remote-control seat: the update trigger plus the phone-icon
		* trigger beside the settings button, and the pairing panel modal. Owns the
		* panel behavior — token minting on open, the status SSE subscription,
		* stop/refresh/copy — and renders the pure {@link RemotePanel} body. The
		* update seat (the dsh-web-ui self-update flow) rides the same footer row,
		* rendered by {@link UpdateEntry}. Component-local state per the client
		* stack rules: nothing here survives remounts or crosses entries.
		*/
		/** Apply one status frame onto the current ready state. */
		function mergeFrame(state, frame) {
			if (state.kind !== "ready") return state;
			return {
				...state,
				phase: frame.phase,
				deviceCount: frame.deviceCount,
				onlineCount: frame.onlineCount,
				...frame.tunnel !== void 0 ? { tunnel: frame.tunnel } : {}
			};
		}
		/**
		* Render the remote-control trigger and panel.
		* @param props - composed slot props (contract in this package).
		* @returns the entry element tree.
		*/
		function RemoteEntry({ wide, useWorkspaces, t }) {
			const [open, setOpen] = (0, react.useState)(false);
			const [state, setState] = (0, react.useState)({ kind: "lan-required" });
			const [copied, setCopied] = (0, react.useState)(false);
			const eventSource = (0, react.useRef)(void 0);
			const workspaceId = useWorkspaces((s) => s.recentWorkspaceId);
			const closeEventSource = (0, react.useCallback)(() => {
				eventSource.current?.close();
				eventSource.current = void 0;
			}, []);
			const mint = (0, react.useCallback)(async (address) => {
				let result;
				try {
					result = await issuePair(workspaceId, address);
				} catch {
					return { kind: "unreachable" };
				}
				if (!result.ok) {
					if (result.code === "forbidden") return { kind: "loopback-required" };
					if (result.code === "unknown-address") return { kind: "unreachable" };
					return { kind: "lan-required" };
				}
				const publicBaseUrl = result.publicBaseUrl;
				return {
					kind: "ready",
					url: result.url,
					expiresAt: result.expiresAt,
					expired: Date.now() > result.expiresAt,
					phase: "waiting",
					deviceCount: 0,
					onlineCount: 0,
					public: publicBaseUrl !== void 0 && result.url.startsWith(publicBaseUrl),
					...publicBaseUrl !== void 0 ? { publicBaseUrl } : {},
					address: address ?? result.lanAddresses[0] ?? "",
					lanAddresses: result.lanAddresses
				};
			}, [workspaceId]);
			const openPanel = (0, react.useCallback)(async () => {
				setOpen(true);
				const next = await mint();
				setState(next);
				if (next.kind !== "ready") return;
				const source = new EventSource("/api/pair/events");
				eventSource.current = source;
				source.onmessage = (event) => {
					try {
						const frame = JSON.parse(event.data);
						if (frame.type !== "state") return;
						setState((previous) => mergeFrame(previous, frame));
					} catch {}
				};
			}, [mint]);
			const closePanel = (0, react.useCallback)(() => {
				closeEventSource();
				setOpen(false);
			}, [closeEventSource]);
			(0, react.useEffect)(() => {
				if (state.kind !== "ready") return;
				if (state.expired) return;
				const delay = state.expiresAt - Date.now();
				if (delay <= 0) {
					setState((previous) => previous.kind === "ready" ? {
						...previous,
						expired: true
					} : previous);
					return;
				}
				const timer = window.setTimeout(() => {
					setState((previous) => previous.kind === "ready" ? {
						...previous,
						expired: true
					} : previous);
				}, delay);
				return () => {
					window.clearTimeout(timer);
				};
			}, [state]);
			(0, react.useEffect)(() => closeEventSource, [closeEventSource]);
			const handleStop = (0, react.useCallback)(() => {
				stopPair().catch(() => {});
				setState((previous) => previous.kind === "ready" ? {
					...previous,
					phase: "stopped"
				} : previous);
			}, []);
			const handleRefresh = (0, react.useCallback)(() => {
				mint().then(setState);
			}, [mint]);
			/** Re-mint against another LAN literal (multi-homed machines). */
			const handlePickAddress = (0, react.useCallback)((address) => {
				mint(address).then(setState);
			}, [mint]);
			/** Re-mint against the configured public (tunneled) base. */
			const handlePickPublic = (0, react.useCallback)(() => {
				mint().then(setState);
			}, [mint]);
			const handleCopy = (0, react.useCallback)(() => {
				if (state.kind !== "ready") return;
				copyText(state.url).then((ok) => {
					if (!ok) return;
					setCopied(true);
					window.setTimeout(() => {
						setCopied(false);
					}, 1500);
				});
			}, [state]);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: remote_module_css_default.entryRow,
				"data-rail": wide ? void 0 : "rail",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(UpdateEntry, {
					wide,
					t
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TooltipAnchor, {
					wide,
					label: t("entry.label"),
					onClick: openPanel
				})]
			}), open && (0, react_dom.createPortal)(/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: remote_module_css_default.overlay,
				role: "presentation",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: remote_module_css_default.mask,
					"aria-hidden": "true",
					onClick: closePanel
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(RemotePanel, {
					t,
					state,
					copied,
					onClose: closePanel,
					onStop: handleStop,
					onRefresh: handleRefresh,
					onCopy: handleCopy,
					onPickAddress: handlePickAddress,
					onPickPublic: handlePickPublic
				})]
			}), document.body)] });
		}
		/** The trigger: an icon button matching the settings rail/row geometry. */
		function TooltipAnchor({ wide, label, onClick }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
				type: "button",
				className: remote_module_css_default.trigger,
				"data-wide": wide ? void 0 : "rail",
				"aria-label": label,
				title: label,
				onClick,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(PhoneIcon, { size: wide ? 16 : 18 })
			});
		}
		//#endregion
		//#region src/client/FooterRemoteEntry.tsx
		/**
		* Render the remote-control trigger + pairing panel from the footer seat.
		* @param props - composed slot props (footer seat subset).
		* @returns the entry element tree.
		*/
		function FooterRemoteEntry(props) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(RemoteEntry, {
				wide: props.wide,
				useWorkspaces: () => void 0,
				useSessions: () => void 0,
				t: props.t
			});
		}
		//#endregion
		//#region src/client/PairFailedNotice.tsx
		/**
		* One-time failed-pairing notice: a fixed toast rendered on the phone after
		* a QR accept failed (invalid/used token or a network error). Mounted by
		* the client apply with a plain React root — no slot machinery for a
		* transient diagnostic.
		*/
		/**
		* Render the failed-pair toast (auto-dismisses).
		* @param props - localized copy.
		* @returns the toast element.
		*/
		function PairFailedNotice({ t }) {
			const [visible, setVisible] = (0, react.useState)(true);
			(0, react.useEffect)(() => {
				const timer = window.setTimeout(() => {
					setVisible(false);
				}, 8e3);
				return () => {
					window.clearTimeout(timer);
				};
			}, []);
			if (!visible) return null;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: remote_module_css_default.notice,
				role: "alert",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
					className: remote_module_css_default.noticeTitle,
					children: t("pair.failed.title")
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
					className: remote_module_css_default.noticeDetail,
					children: t("pair.failed.detail")
				})]
			});
		}
		//#endregion
		//#region \0dsh-css:packages/dsh-remote-web-ui/src/client/settings-card.module.css.mjs
		const css = ".Kwoi6G_card{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-3);border-radius:12px;list-style:none;transition:border-color .16s,background .16s}.Kwoi6G_card:hover{border-color:var(--dsw-alias-label-dimmed)}.Kwoi6G_cardOpen{background:var(--dsw-alias-bg-layer-2);border-color:var(--dsw-alias-label-dimmed)}.Kwoi6G_header{appearance:none;width:100%;font:inherit;color:inherit;text-align:left;cursor:pointer;background:0 0;border:0;border-radius:12px;align-items:center;gap:12px;padding:14px 16px;display:flex}.Kwoi6G_header:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:-2px}.Kwoi6G_headerStatic{border-radius:12px;align-items:center;gap:12px;width:100%;padding:14px 16px;display:flex}.Kwoi6G_headText{flex-direction:column;flex:1;gap:4px;min-width:0;display:flex}.Kwoi6G_name{color:var(--dsw-alias-label-primary);font-size:15px;font-weight:600;line-height:1.4}.Kwoi6G_description{color:var(--dsw-alias-label-tertiary);font-size:13px;line-height:1.5}.Kwoi6G_pending{white-space:nowrap;background:var(--dsw-alias-bg-module-platform);color:var(--dsw-alias-label-secondary);border-radius:999px;flex:none;padding:1px 8px;font-size:11px;font-weight:500;line-height:17px}.Kwoi6G_chevron{color:var(--dsw-alias-label-tertiary);flex:none;transition:transform .16s}.Kwoi6G_chevronOpen{transform:rotate(180deg)}.Kwoi6G_body{border-top:1px solid var(--dsw-alias-border-l2);margin:0 16px;padding-bottom:8px}.Kwoi6G_readOnly{color:var(--dsw-alias-label-tertiary);margin:12px 0 0;font-size:12px;line-height:1.5}.Kwoi6G_notExposed{color:var(--dsw-alias-state-warn-primary);margin:12px 0 0;font-size:12px;line-height:1.5}.Kwoi6G_footer{border-top:1px solid var(--dsw-alias-border-l2);justify-content:flex-end;align-items:center;gap:8px;padding:12px 0 4px;display:flex}.Kwoi6G_failed{min-width:0;color:var(--dsw-alias-label-error);text-overflow:ellipsis;white-space:nowrap;flex:1;margin:0;font-size:12px;line-height:1.5;overflow:hidden}.Kwoi6G_discard,.Kwoi6G_save{appearance:none;font:inherit;cursor:pointer;border:1px solid #0000;border-radius:8px;padding:5px 14px;font-size:13px;line-height:1.5}.Kwoi6G_discard{border-color:var(--dsw-alias-border-l2);color:var(--dsw-alias-label-secondary);background:0 0}.Kwoi6G_discard:hover:not(:disabled){color:var(--dsw-alias-label-primary);border-color:var(--dsw-alias-label-dimmed)}.Kwoi6G_save{background:var(--dsw-alias-label-primary);color:var(--dsw-alias-bg-layer-3)}.Kwoi6G_discard:disabled,.Kwoi6G_save:disabled{opacity:.4;cursor:default}.Kwoi6G_discard:focus-visible,.Kwoi6G_save:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:1px}.Kwoi6G_field{flex-direction:column;gap:6px;padding:12px 0;display:flex}.Kwoi6G_field+.Kwoi6G_field{border-top:1px solid var(--dsw-alias-border-l2)}.Kwoi6G_head{align-items:center;gap:8px;display:flex}.Kwoi6G_label{min-width:0;color:var(--dsw-alias-label-primary);flex:1;font-size:13px;font-weight:500;line-height:1.5}.Kwoi6G_badges{align-items:center;gap:8px;display:inline-flex}.Kwoi6G_badge{white-space:nowrap;background:var(--dsw-alias-bg-module-platform);color:var(--dsw-alias-label-secondary);border-radius:999px;padding:1px 8px;font-size:11px;font-weight:500;line-height:17px}.Kwoi6G_reset{font:inherit;color:var(--dsw-alias-label-secondary);cursor:pointer;background:0 0;border:none;padding:0;font-size:12px;line-height:1.5}.Kwoi6G_reset:hover:not(:disabled){color:var(--dsw-alias-label-primary)}.Kwoi6G_reset:disabled{cursor:default}.Kwoi6G_reset:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px;outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}.Kwoi6G_input,.Kwoi6G_select{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-3);height:34px;font:inherit;color:var(--dsw-alias-label-primary);border-radius:8px;padding:0 12px;font-size:13px;line-height:1.5}.Kwoi6G_input:focus-visible,.Kwoi6G_select:focus-visible{border-color:var(--dsw-alias-brand-primary);outline:none}.Kwoi6G_input:disabled,.Kwoi6G_select:disabled{color:var(--dsw-alias-label-tertiary);cursor:default}.Kwoi6G_inputInvalid{border:1px solid var(--dsw-alias-label-error);background:var(--dsw-alias-bg-layer-3);height:34px;font:inherit;color:var(--dsw-alias-label-primary);border-radius:8px;padding:0 12px;font-size:13px;line-height:1.5}.Kwoi6G_inputInvalid:focus-visible{outline:2px solid var(--dsw-alias-label-error);outline-offset:1px;border-color:var(--dsw-alias-label-error)}.Kwoi6G_invalid{color:var(--dsw-alias-label-error);margin:0;font-size:12px;line-height:1.5}.Kwoi6G_hint{color:var(--dsw-alias-label-tertiary);margin:0;font-size:12px;line-height:1.5}@media (prefers-reduced-motion:reduce){.Kwoi6G_card,.Kwoi6G_header,.Kwoi6G_chevron,.Kwoi6G_chevronOpen,.Kwoi6G_discard,.Kwoi6G_save{transition:none}}";
		const tagId = "@linxin666/dsh-remote-web-ui/settings-card.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@linxin666/dsh-remote-web-ui";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		var settings_card_module_css_default = {
			"badge": "Kwoi6G_badge",
			"badges": "Kwoi6G_badges",
			"body": "Kwoi6G_body",
			"card": "Kwoi6G_card",
			"cardOpen": "Kwoi6G_cardOpen",
			"chevron": "Kwoi6G_chevron",
			"chevronOpen": "Kwoi6G_chevronOpen",
			"description": "Kwoi6G_description",
			"discard": "Kwoi6G_discard",
			"failed": "Kwoi6G_failed",
			"field": "Kwoi6G_field",
			"footer": "Kwoi6G_footer",
			"head": "Kwoi6G_head",
			"headText": "Kwoi6G_headText",
			"header": "Kwoi6G_header",
			"headerStatic": "Kwoi6G_headerStatic",
			"hint": "Kwoi6G_hint",
			"input": "Kwoi6G_input",
			"inputInvalid": "Kwoi6G_inputInvalid",
			"invalid": "Kwoi6G_invalid",
			"label": "Kwoi6G_label",
			"name": "Kwoi6G_name",
			"notExposed": "Kwoi6G_notExposed",
			"pending": "Kwoi6G_pending",
			"readOnly": "Kwoi6G_readOnly",
			"reset": "Kwoi6G_reset",
			"save": "Kwoi6G_save",
			"select": "Kwoi6G_select"
		};
		//#endregion
		//#region src/client/PluginSettingsCard.tsx
		/**
		* Family-shared chrome for plugin settings cards: a disclosure header naming
		* the plugin and what its settings govern, the controls inside, and the save
		* that writes them. Renders nothing while the namespace is unavailable — a
		* deployment that does not compose the owning plugin should show no trace of
		* it. Inlined into each consumer's client bundle; mirrors the official
		* ui-plugin-config PluginCard in a self-contained slice.
		*/
		/**
		* Render one plugin settings card.
		* @param props - the plugin's copy keys, its form state, and its controls.
		* @returns the card, or nothing while the namespace is still loading.
		*/
		function PluginSettingsCard(props) {
			const [open, setOpen] = (0, react.useState)(props.defaultOpen ?? true);
			const { state, alwaysOpen } = props;
			if (!state.available) return null;
			const title = props.t(props.titleKey);
			const description = props.t(props.descriptionKey);
			const blocked = !state.dirty || state.invalid || state.saving;
			const expanded = alwaysOpen === true || open;
			const cardClass = expanded ? `${settings_card_module_css_default.cardOpen} ${settings_card_module_css_default.card}` : settings_card_module_css_default.card;
			const header = alwaysOpen === true ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: settings_card_module_css_default.headerStatic,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
					className: settings_card_module_css_default.headText,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: settings_card_module_css_default.name,
						title,
						children: title
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: settings_card_module_css_default.description,
						title: description,
						children: description
					})]
				}), state.dirty ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: settings_card_module_css_default.pending,
					title: props.t("settings.unsaved"),
					children: props.t("settings.unsaved")
				}) : null]
			}) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
				type: "button",
				className: settings_card_module_css_default.header,
				"aria-expanded": open,
				"aria-label": `${props.t(open ? "settings.collapse" : "settings.expand")}: ${title}`,
				onClick: () => {
					setOpen(!open);
				},
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
						className: settings_card_module_css_default.headText,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: settings_card_module_css_default.name,
							title,
							children: title
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: settings_card_module_css_default.description,
							title: description,
							children: description
						})]
					}),
					state.dirty ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: settings_card_module_css_default.pending,
						title: props.t("settings.unsaved"),
						children: props.t("settings.unsaved")
					}) : null,
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
						width: "14",
						height: "14",
						viewBox: "0 0 14 14",
						fill: "none",
						xmlns: "http://www.w3.org/2000/svg",
						className: open ? `${settings_card_module_css_default.chevron} ${settings_card_module_css_default.chevronOpen}` : settings_card_module_css_default.chevron,
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
							d: "M11.8486 5.5L11.4238 5.92383L8.69727 8.65137C8.44157 8.90706 8.21562 9.13382 8.01172 9.29785C7.79912 9.46883 7.55595 9.61756 7.25 9.66602C7.08435 9.69222 6.91565 9.69222 6.75 9.66602C6.44405 9.61756 6.20088 9.46883 5.98828 9.29785C5.78438 9.13382 5.55843 8.90706 5.30273 8.65137L2.57617 5.92383L2.15137 5.5L3 4.65137L3.42383 5.07617L6.15137 7.80273C6.42595 8.07732 6.59876 8.24849 6.74023 8.3623C6.87291 8.46904 6.92272 8.47813 6.9375 8.48047C6.97895 8.48703 7.02105 8.48703 7.0625 8.48047C7.07728 8.47813 7.12709 8.46904 7.25977 8.3623C7.40124 8.24849 7.57405 8.07732 7.84863 7.80273L10.5762 5.07617L11 4.65137L11.8486 5.5Z",
							fill: "currentColor"
						})
					})
				]
			});
			if (!state.exposed) return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("li", {
				className: cardClass,
				children: [header, expanded ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: settings_card_module_css_default.body,
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: settings_card_module_css_default.notExposed,
						role: "status",
						children: props.t("settings.notExposed")
					})
				}) : null]
			});
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("li", {
				className: cardClass,
				children: [header, expanded ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: settings_card_module_css_default.body,
					children: [
						!state.writable ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							className: settings_card_module_css_default.readOnly,
							role: "status",
							children: props.t("settings.readOnly")
						}) : null,
						props.children,
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: settings_card_module_css_default.footer,
							children: [
								state.failed ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", {
									className: settings_card_module_css_default.failed,
									role: "status",
									children: [props.t("settings.saveFailed"), state.failedReason ? " - " + state.failedReason : ""]
								}) : null,
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: settings_card_module_css_default.discard,
									disabled: !state.dirty || state.saving,
									onClick: props.onDiscard,
									children: props.t("settings.discard")
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: settings_card_module_css_default.save,
									disabled: blocked,
									onClick: props.onSave,
									children: props.t(!state.saving ? "settings.save" : "settings.saving")
								})
							]
						})
					]
				}) : null]
			});
		}
		/** A staged value field. `numeric` only hints the keypad: which drafts a field accepts is decided by its spec. */
		function ValueField(props) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: settings_card_module_css_default.field,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: settings_card_module_css_default.head,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("label", {
							className: settings_card_module_css_default.label,
							htmlFor: props.id,
							children: props.label
						}), props.overridden ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
							className: settings_card_module_css_default.badges,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: settings_card_module_css_default.badge,
								children: props.overriddenLabel
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: settings_card_module_css_default.reset,
								disabled: props.disabled,
								onClick: props.onReset,
								children: props.resetLabel
							})]
						}) : null]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
						id: props.id,
						className: props.invalid ? settings_card_module_css_default.inputInvalid : settings_card_module_css_default.input,
						type: "text",
						...props.numeric === true ? { inputMode: "numeric" } : {},
						...props.invalid ? { "aria-invalid": true } : {},
						value: props.text,
						placeholder: props.placeholder ?? "",
						disabled: props.disabled,
						onChange: (event) => {
							props.onEdit(event.target.value);
						}
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: props.invalid ? settings_card_module_css_default.invalid : settings_card_module_css_default.hint,
						children: props.invalid ? props.invalidLabel : props.hint
					})
				]
			});
		}
		/** A staged boolean field: 继承 / 开 / 关. */
		function BooleanField(props) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: settings_card_module_css_default.field,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: settings_card_module_css_default.head,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("label", {
							className: settings_card_module_css_default.label,
							htmlFor: props.id,
							children: props.label
						}), props.overridden ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
							className: settings_card_module_css_default.badges,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: settings_card_module_css_default.badge,
								children: props.overriddenLabel
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: settings_card_module_css_default.reset,
								disabled: props.disabled,
								onClick: props.onReset,
								children: props.resetLabel
							})]
						}) : null]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("select", {
						id: props.id,
						className: settings_card_module_css_default.select,
						value: props.text,
						disabled: props.disabled,
						onChange: (event) => {
							props.onEdit(event.target.value);
						},
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
								value: "",
								children: props.inheritLabel
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
								value: "true",
								children: props.onLabel
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
								value: "false",
								children: props.offLabel
							})
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: settings_card_module_css_default.hint,
						children: props.hint
					})
				]
			});
		}
		//#endregion
		//#region src/client/settings-form.ts
		/** A whole- or decimal-number field. An empty draft clears the field; any other draft that is not a finite number within the constraints blocks the save. */
		function numberField(field, constraints = {}) {
			const { integer = false, min } = constraints;
			return {
				field,
				format: (value) => typeof value === "number" ? String(value) : "",
				parse: (text) => {
					const trimmed = text.trim();
					if (trimmed === "") return { kind: "clear" };
					const parsed = Number(trimmed);
					if (!Number.isFinite(parsed)) return void 0;
					if (integer && !Number.isInteger(parsed)) return void 0;
					if (min !== void 0 && parsed < min) return void 0;
					return {
						kind: "set",
						value: parsed
					};
				}
			};
		}
		/** A free-text field. An empty draft clears the field. */
		function textField(field) {
			return {
				field,
				format: (value) => typeof value === "string" ? value : "",
				parse: (text) => {
					const trimmed = text.trim();
					return trimmed === "" ? { kind: "clear" } : {
						kind: "set",
						value: trimmed
					};
				}
			};
		}
		/** A boolean field, edited through true/false draft text. */
		function booleanField(field) {
			return {
				field,
				format: (value) => typeof value === "boolean" ? String(value) : "",
				parse: (text) => {
					const trimmed = text.trim();
					if (trimmed === "") return { kind: "clear" };
					if (trimmed === "true") return {
						kind: "set",
						value: true
					};
					if (trimmed === "false") return {
						kind: "set",
						value: false
					};
				}
			};
		}
		/**
		* Stages one card's edits over one settings namespace and writes them on save.
		*
		* The Host is the only authority on whether a value was accepted — its
		* validators own the constraints no schema can express — so the outcome is
		* read back from the section rather than predicted here. A save that did not
		* land keeps its drafts, so the user can correct them instead of retyping.
		*/
		var CardForm = class {
			scope;
			specs;
			staged = /* @__PURE__ */ new Map();
			listeners = /* @__PURE__ */ new Set();
			saving = false;
			failed = false;
			failedReason;
			/** @param scope - the bound settings scope for this card's namespace. */
			constructor(scope, specs) {
				this.scope = scope;
				this.specs = new Map(specs.map((spec) => [spec.field, spec]));
				scope.subscribe(() => {
					this.publish();
				});
			}
			/** Publish a projection of this form, rebuilt whenever the scope or a draft changes. */
			bind(project) {
				const store = (0, _deepseek_ai_dsh_client_runtime_client.createSnapshotStore)(project());
				this.listeners.add(() => {
					store.set(project());
				});
				return store;
			}
			/** Read the card-level state: what the Host serves, and what a save would do. */
			shell() {
				const snapshot = this.scope.getSnapshot();
				const plan = this.plan();
				return {
					available: snapshot.status !== "loading",
					exposed: snapshot.status === "ready",
					writable: snapshot.writable,
					dirty: plan.length > 0,
					invalid: plan.some((item) => item.run === void 0),
					saving: this.saving,
					failed: this.failed,
					...this.failedReason === void 0 ? {} : { failedReason: this.failedReason }
				};
			}
			/** Read one field's state from the effective section and its staged draft. */
			field(field) {
				const spec = this.specOf(field);
				const staged = this.staged.get(field);
				if (staged === void 0) return {
					text: spec.format(this.sectionValue(field)),
					overridden: this.stored(field),
					invalid: false
				};
				const write = staged.clear ? { kind: "clear" } : spec.parse(staged.text);
				return {
					text: staged.text,
					overridden: write?.kind === "set",
					invalid: write === void 0
				};
			}
			/** The actions the card's slot registration injects. */
			actions() {
				return {
					edit: (field, text) => {
						this.stage(field, {
							text,
							clear: false
						});
					},
					resetField: (field) => {
						this.stage(field, {
							text: this.specOf(field).format(this.baseValue(field)),
							clear: true
						});
					},
					save: () => {
						this.save();
					},
					discard: () => {
						if (this.staged.size === 0 && !this.failed) return;
						this.staged.clear();
						this.failed = false;
						this.failedReason = void 0;
						this.publish();
					}
				};
			}
			/**
			* Write every staged edit, then re-seed from what the Host accepted.
			*
			* When the scope carries the optional batch surface (the dsh-web-ui
			* bridge scope), every planned write rides one mutation so cross-field
			* validate hooks (baseURL+model) judge the batch as a unit instead of
			* deadlocking on per-field writes. Otherwise the per-field loop runs.
			* A field lands only when the Host reports it held the staged value; a
			* landed field's draft is dropped, a failed one stays staged for the user.
			* @returns settlement after every write and the read-back.
			*/
			async save() {
				const plan = this.plan();
				const valid = plan.filter((item) => item.run !== void 0);
				if (plan.length === 0 || this.saving || valid.length !== plan.length) return;
				const plannedWrites = valid.map((item) => item.op);
				const fields = new Set(plan.map((item) => item.field));
				this.saving = true;
				this.failed = false;
				this.failedReason = void 0;
				this.publish();
				const landed = /* @__PURE__ */ new Set();
				const batch = this.batchedScope();
				if (batch !== void 0) {
					const result = await batch.mutate(plannedWrites);
					if (result.ok) {
						for (const field of result.fields) if (field.landed) landed.add(field.field);
					} else this.failedReason = result.message;
				} else for (const item of valid) if (await item.run()) landed.add(item.field);
				for (const field of fields) if (landed.has(field)) this.staged.delete(field);
				this.saving = false;
				this.failed = landed.size !== fields.size;
				this.publish();
			}
			/** The scope's batch surface when it supports one; undefined conservatively otherwise. */
			batchedScope() {
				const candidate = this.scope;
				return typeof candidate?.mutate === "function" ? candidate : void 0;
			}
			/**
			* Every staged edit a save would write. An entry whose draft is not a value
			* its field accepts carries no write: the form is still dirty, and the save
			* refuses rather than dropping the edit. A staged edit that matches the
			* effective section is not a write at all.
			* @returns the planned writes, in the order the fields were staged.
			*/
			plan() {
				const plan = [];
				for (const [field, staged] of this.staged) {
					const spec = this.specOf(field);
					if (staged.clear) {
						if (this.stored(field)) plan.push({
							field,
							op: {
								field,
								op: "unset"
							},
							run: () => this.clear(field)
						});
						continue;
					}
					if (staged.text === spec.format(this.sectionValue(field))) continue;
					const write = spec.parse(staged.text);
					if (write === void 0) plan.push({
						field,
						op: {
							field,
							op: "unset"
						},
						run: void 0
					});
					else if (write.kind === "clear") plan.push({
						field,
						op: {
							field,
							op: "unset"
						},
						run: () => this.clear(field)
					});
					else plan.push({
						field,
						op: {
							field,
							op: "set",
							value: write.value
						},
						run: () => this.store(field, write.value)
					});
				}
				return plan;
			}
			async clear(field) {
				await this.scope.unset(field);
				return !this.stored(field);
			}
			async store(field, value) {
				await this.scope.set(field, value);
				if (this.specOf(field).secret) return true;
				return this.userLayer()?.[field] === value;
			}
			stage(field, edit) {
				this.staged.set(field, edit);
				this.failed = false;
				this.failedReason = void 0;
				this.publish();
			}
			specOf(field) {
				const spec = this.specs.get(field);
				if (spec === void 0) throw new Error(`settings card has no field ${field}`);
				return spec;
			}
			snapshotOf() {
				return this.scope.getSnapshot();
			}
			sectionValue(field) {
				return this.snapshotOf().value?.[field];
			}
			baseValue(field) {
				return this.snapshotOf().base?.[field];
			}
			userLayer() {
				return this.snapshotOf().user;
			}
			stored(field) {
				const user = this.userLayer();
				return user !== void 0 && Object.hasOwn(user, field);
			}
			publish() {
				for (const listener of this.listeners) listener();
			}
		};
		//#endregion
		//#region src/client/RemoteSettingsCard.tsx
		/** Bridges the `remote-web-ui` scope onto the card's staged form. */
		var RemoteSettingsCardController = class {
			form;
			store;
			/** @param scope - the bound settings scope for the `remote-web-ui` namespace. */
			constructor(scope) {
				this.form = new CardForm(scope, [
					booleanField("enabled"),
					numberField("tokenTtlMs"),
					numberField("offlineAfterMs"),
					numberField("maxDevices"),
					textField("cookieName"),
					booleanField("requirePairingForLan"),
					textField("publicBaseUrl"),
					booleanField("autoTunnel"),
					booleanField("mobileEnterToSend")
				]);
				this.store = this.form.bind(() => this.projection());
			}
			projection() {
				return {
					...this.form.shell(),
					enabled: this.form.field("enabled"),
					tokenTtlMs: this.form.field("tokenTtlMs"),
					offlineAfterMs: this.form.field("offlineAfterMs"),
					maxDevices: this.form.field("maxDevices"),
					cookieName: this.form.field("cookieName"),
					requirePairingForLan: this.form.field("requirePairingForLan"),
					publicBaseUrl: this.form.field("publicBaseUrl"),
					autoTunnel: this.form.field("autoTunnel"),
					mobileEnterToSend: this.form.field("mobileEnterToSend")
				};
			}
			/**
			* Build the face the card's slot registration injects.
			* @returns the card's snapshot and its form actions.
			*/
			inject() {
				return {
					hooks: { remoteSettingsCard: this.store },
					...this.form.actions()
				};
			}
		};
		/**
		* Render the remote-control card.
		* @param props - locale copy, the card snapshot, and its form actions.
		* @returns the card.
		*/
		function RemoteSettingsCard(props) {
			const { t } = props;
			const state = props.useRemoteSettingsCard((snapshot) => snapshot);
			const disabled = !state.writable;
			const fieldProps = {
				overriddenLabel: t("settings.overridden"),
				resetLabel: t("settings.reset"),
				invalidLabel: t("settings.invalidNumber"),
				disabled
			};
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(PluginSettingsCard, {
				t,
				titleKey: "settings.title",
				descriptionKey: "settings.description",
				state,
				onSave: props.save,
				onDiscard: props.discard,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(BooleanField, {
						id: "settings-remote-enabled",
						label: t("settings.enabled"),
						hint: t("settings.enabledHint"),
						inheritLabel: t("settings.inherit"),
						onLabel: t("settings.on"),
						offLabel: t("settings.off"),
						...fieldProps,
						...state.enabled,
						onEdit: (text) => {
							props.edit("enabled", text);
						},
						onReset: () => {
							props.resetField("enabled");
						}
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ValueField, {
						id: "settings-remote-token-ttl",
						label: t("settings.tokenTtlMs"),
						hint: t("settings.tokenTtlMsHint"),
						numeric: true,
						...fieldProps,
						...state.tokenTtlMs,
						onEdit: (text) => {
							props.edit("tokenTtlMs", text);
						},
						onReset: () => {
							props.resetField("tokenTtlMs");
						}
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ValueField, {
						id: "settings-remote-offline",
						label: t("settings.offlineAfterMs"),
						hint: t("settings.offlineAfterMsHint"),
						numeric: true,
						...fieldProps,
						...state.offlineAfterMs,
						onEdit: (text) => {
							props.edit("offlineAfterMs", text);
						},
						onReset: () => {
							props.resetField("offlineAfterMs");
						}
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ValueField, {
						id: "settings-remote-max-devices",
						label: t("settings.maxDevices"),
						hint: t("settings.maxDevicesHint"),
						numeric: true,
						...fieldProps,
						...state.maxDevices,
						onEdit: (text) => {
							props.edit("maxDevices", text);
						},
						onReset: () => {
							props.resetField("maxDevices");
						}
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ValueField, {
						id: "settings-remote-cookie",
						label: t("settings.cookieName"),
						hint: t("settings.cookieNameHint"),
						...fieldProps,
						...state.cookieName,
						onEdit: (text) => {
							props.edit("cookieName", text);
						},
						onReset: () => {
							props.resetField("cookieName");
						}
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(BooleanField, {
						id: "settings-remote-fence",
						label: t("settings.requirePairingForLan"),
						hint: t("settings.requirePairingForLanHint"),
						inheritLabel: t("settings.inherit"),
						onLabel: t("settings.on"),
						offLabel: t("settings.off"),
						...fieldProps,
						...state.requirePairingForLan,
						onEdit: (text) => {
							props.edit("requirePairingForLan", text);
						},
						onReset: () => {
							props.resetField("requirePairingForLan");
						}
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ValueField, {
						id: "settings-remote-public-base",
						label: t("settings.publicBaseUrl"),
						hint: t("settings.publicBaseUrlHint"),
						placeholder: "https://example.trycloudflare.com",
						...fieldProps,
						...state.publicBaseUrl,
						onEdit: (text) => {
							props.edit("publicBaseUrl", text);
						},
						onReset: () => {
							props.resetField("publicBaseUrl");
						}
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(BooleanField, {
						id: "settings-remote-auto-tunnel",
						label: t("settings.autoTunnel"),
						hint: t("settings.autoTunnelHint"),
						inheritLabel: t("settings.inherit"),
						onLabel: t("settings.on"),
						offLabel: t("settings.off"),
						...fieldProps,
						...state.autoTunnel,
						onEdit: (text) => {
							props.edit("autoTunnel", text);
						},
						onReset: () => {
							props.resetField("autoTunnel");
						}
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(BooleanField, {
						id: "settings-remote-mobile-enter",
						label: t("settings.mobileEnterToSend"),
						hint: t("settings.mobileEnterToSendHint"),
						inheritLabel: t("settings.inherit"),
						onLabel: t("settings.on"),
						offLabel: t("settings.off"),
						...fieldProps,
						...state.mobileEnterToSend,
						onEdit: (text) => {
							props.edit("mobileEnterToSend", text);
						},
						onReset: () => {
							props.resetField("mobileEnterToSend");
						}
					})
				]
			});
		}
		//#endregion
		//#region src/client/locales.ts
		/** `remote` namespace dictionaries: the mobile remote-control surface copy. */
		/** Simplified Chinese dictionary (the key-set source of truth). */
		const zh = {
			"entry.label": "移动端远程控制",
			"title": "移动端远程控制",
			"subtitle": "扫码或在手机上打开链接，即可远程控制当前工作区",
			"card.title": "手机扫码连接",
			"public.badge": "公网",
			"status.waiting": "等待手机连接",
			"status.connected": "已连接 {n} 台设备",
			"status.disconnected": "已配对设备离线",
			"status.stopped": "已停止移动端访问",
			"status.lanRequired": "此功能需要以 --host 0.0.0.0 启动 dsh web，或配置公网地址才能使用",
			"status.lanRequiredHint": "当前服务仅绑定在 127.0.0.1 且未配置公网地址，手机无法访问。请用 dsh web --host 0.0.0.0 重新启动，或在设置中填写内网穿透的公网地址。",
			"status.loopbackRequired": "配对面板仅限本机使用",
			"status.loopbackRequiredHint": "请通过 http://127.0.0.1 打开此页面后重试；手机请使用配对链接访问。",
			"status.unreachable": "无法连接配对服务",
			"status.unreachableHint": "请刷新页面后重试。",
			"pair.hint": "无法扫码？可以在手机上打开链接",
			"pair.publicHint": "公网链接：手机无需与电脑在同一网络",
			"address.label": "选择二维码指向的网络",
			"address.public": "公网地址",
			"address.lan": "局域网",
			"address.hint": "公网地址适合手机不在同一网络时使用；局域网地址仅在手机与电脑同一网络时可用。",
			"pair.expires": "二维码有效至 {time}",
			"pair.expired": "二维码已过期，请刷新",
			"pair.failed.title": "配对失败",
			"pair.failed.detail": "链接无效或已使用，请回到电脑端刷新二维码后重新扫码。",
			"action.stop": "停止",
			"action.refresh": "刷新二维码",
			"action.copy": "复制链接",
			"action.copied": "已复制",
			"stopped.hint": "已停止移动端访问。点击\"刷新二维码\"重新开启。",
			"tunnel.starting": "公网隧道启动中，二维码将自动变为公网链接…",
			"tunnel.failed": "公网隧道启动失败：{error}",
			"tunnel.unknownError": "未知错误",
			"close.label": "关闭移动端远程控制面板",
			"settings.title": "移动端远程控制",
			"settings.description": "配对安全与设备限额。",
			"settings.enabled": "启用移动端远程控制",
			"settings.enabledHint": "关闭后移除侧边栏入口并停用配对路由与局域网栅栏。",
			"settings.tokenTtlMs": "配对令牌有效期（毫秒）",
			"settings.tokenTtlMsHint": "新生成的二维码链接在此时间后失效。",
			"settings.offlineAfterMs": "设备离线判定（毫秒）",
			"settings.offlineAfterMsHint": "配对设备超过该时长未上报心跳即视为离线。",
			"settings.maxDevices": "已配对设备上限",
			"settings.maxDevicesHint": "超过上限时淘汰最旧的设备会话。",
			"settings.cookieName": "设备 Cookie 名",
			"settings.cookieNameHint": "携带已配对设备标识的 Cookie 名称。",
			"settings.requirePairingForLan": "局域网访问要求配对",
			"settings.requirePairingForLanHint": "开启：所有非本机回环的 /api 请求必须携带有效配对 Cookie；关闭：局域网栅栏放开，配对仅用于令牌与状态管理。",
			"settings.publicBaseUrl": "公网地址（可选）",
			"settings.publicBaseUrlHint": "内网穿透的公网地址，如 Cloudflare Tunnel：https://xxx.trycloudflare.com。填写后二维码将生成公网链接，手机不在同一网络也能配对；留空则仅局域网可用。",
			"settings.autoTunnel": "自动公网隧道",
			"settings.autoTunnelHint": "开启后插件自动启动 Cloudflare quick tunnel（无需安装任何工具），并自动更新公网地址与信任配置，手机随时可用公网配对；关闭时使用上方手动填写的公网地址。",
			"settings.mobileEnterToSend": "移动端回车发送",
			"settings.mobileEnterToSendHint": "开启：移动端输入框按 Enter 直接发送，Shift+Enter 换行；关闭：Enter 换行，仅点发送按钮发送。",
			"settings.inherit": "继承",
			"settings.on": "开",
			"settings.off": "关",
			"settings.overridden": "已覆盖",
			"settings.reset": "恢复默认",
			"settings.notExposed": "当前 DSH 版本未向设置页暴露本插件的配置命名空间，表单不可用。可编辑 ~/.dsh/settings.yaml 直接配置，或为 dsh-host-apiproxy 的 WEB_SETTINGS_NAMESPACES 白名单补充本命名空间后重启。",
			"settings.readOnly": "当前部署的设置只读。",
			"settings.expand": "展开设置",
			"settings.collapse": "收起设置",
			"settings.save": "保存",
			"settings.saving": "保存中…",
			"settings.discard": "放弃",
			"settings.unsaved": "未保存",
			"settings.saveFailed": "部署未接受这些值，已保留供你修改。",
			"settings.invalidNumber": "请输入数字，留空则使用默认值。",
			"update.label": "检查更新",
			"update.title": "检查更新",
			"update.checking": "正在检查远程仓库中的新版本…",
			"update.upToDate": "当前已是最新版本",
			"update.upToDateDetail": "{name} 已是最新版本 v{version}。",
			"update.found": "发现新版本",
			"update.foundDetail": "{name} 有新版本 v{version}，正在自动更新…",
			"update.updating": "正在更新 {name} 至 v{version}，可能需要 1-2 分钟…",
			"update.updatingTitle": "正在自动更新…",
			"update.done": "更新完成",
			"update.doneDetail": "所有组件已更新到最新版本。",
			"update.restartHint": "请重启 dsh web 使新版本生效：在终端按 Ctrl+C 停止后重新运行 dsh web。",
			"update.linkMode": "当前为本地开发模式",
			"update.linkModeDetail": "dsh-web-ui 通过本地链接安装（开发模式），无法自动更新。npm 上最新版本：{version}。请在仓库中执行 git pull 更新。",
			"update.missing": "未找到 dsh-web-ui 安装",
			"update.missingDetail": "无法定位已安装的 dsh-web-ui 聚合包。请先运行 dsh plugin --profile <profile> add @linxin666/dsh-web-ui-all。",
			"update.offline": "无法连接更新源",
			"update.offlineDetail": "网络不可用或更新服务异常，请稍后重试。",
			"update.unmounted": "更新服务未加载",
			"update.unmountedDetail": "当前 dsh web 进程运行的插件版本不含更新服务，请重启 dsh web（Ctrl+C 后重新运行）后再试。",
			"update.error": "更新失败",
			"update.packages": "组件版本",
			"update.retry": "重新检查",
			"update.close": "关闭更新面板",
			"update.error.pnpmMissing": "未找到 pnpm，已尝试 pnpm / corepack / npx 仍不可用。请安装 pnpm 后重启应用（Windows: npm install -g pnpm 或 corepack enable；macOS: brew install pnpm 或 corepack enable）。",
			"update.error.timeout": "更新超时，已终止安装进程，请重试。",
			"update.error.notFound": "未找到 dsh-web-ui 聚合包安装，无法更新。",
			"update.error.link": "当前为本地开发模式（链接安装），无法自动更新。",
			"update.error.pnpmFailed": "更新执行失败（pnpm 退出码 {code}），详见下方输出。",
			"update.error.stale": "更新命令已执行，但安装版本未变化。常见原因：pnpm 11 的 minimumReleaseAge 门禁会静默跳过发布不足 24 小时的新版本。请在 profile 目录（~/.dsh/profiles/<profile>）的 pnpm-workspace.yaml 中配置 minimumReleaseAgeExclude（例如 \"@linxin666/*\"）或 minimumReleaseAge: 0 后重新点击更新。",
			"update.error.verifyFailed": "更新命令已执行，但无法核对安装后的版本（可能是 registry 探测失败或安装路径变化）。请查看下方输出，或稍后重试。",
			"update.error.unknown": "更新失败，请重试。"
		};
		/** English dictionary, checked complete against the zh key set. */
		const en = {
			"entry.label": "Mobile remote control",
			"title": "Mobile remote control",
			"subtitle": "Scan the QR code or open the link on your phone to control this workspace remotely",
			"card.title": "Scan to connect",
			"public.badge": "Public",
			"status.waiting": "Waiting for a phone",
			"status.connected": "{n} device(s) connected",
			"status.disconnected": "Paired devices offline",
			"status.stopped": "Mobile access stopped",
			"status.lanRequired": "This feature needs dsh web started with --host 0.0.0.0, or a configured public address",
			"status.lanRequiredHint": "The server is bound to 127.0.0.1 and no public address is configured, so a phone cannot reach it. Restart with dsh web --host 0.0.0.0, or set the tunneled public address in settings.",
			"status.loopbackRequired": "The pairing panel works on this machine only",
			"status.loopbackRequiredHint": "Open this page at http://127.0.0.1 to mint a QR code; phones use the paired link.",
			"status.unreachable": "Cannot reach the pairing service",
			"status.unreachableHint": "Refresh the page and try again.",
			"pair.hint": "Cannot scan? Open the link on your phone",
			"pair.publicHint": "Public link: the phone does not need to be on the same network",
			"address.label": "Network the QR code points to",
			"address.public": "Public",
			"address.lan": "LAN",
			"address.hint": "Use the public address when the phone is not on the same network; LAN addresses only work on the same network.",
			"pair.expires": "QR code valid until {time}",
			"pair.expired": "QR code expired — refresh it",
			"pair.failed.title": "Pairing failed",
			"pair.failed.detail": "The link is invalid or was already used. Refresh the QR code on your computer and scan again.",
			"action.stop": "Stop",
			"action.refresh": "Refresh QR",
			"action.copy": "Copy link",
			"action.copied": "Copied",
			"stopped.hint": "Mobile access is stopped. Click \"Refresh QR\" to re-enable it.",
			"tunnel.starting": "The public tunnel is starting; the QR code will switch to a public link shortly…",
			"tunnel.failed": "The public tunnel failed to start: {error}",
			"tunnel.unknownError": "unknown error",
			"close.label": "Close mobile remote control panel",
			"settings.title": "Mobile remote control",
			"settings.description": "Pairing security and device limits.",
			"settings.enabled": "Enable mobile remote control",
			"settings.enabledHint": "When off, the sidebar entry is removed and pairing routes plus the LAN fence stop.",
			"settings.tokenTtlMs": "Pairing token lifetime (ms)",
			"settings.tokenTtlMsHint": "How long a minted QR link stays valid before it dies.",
			"settings.offlineAfterMs": "Device offline threshold (ms)",
			"settings.offlineAfterMsHint": "A paired device flips to offline when it has not been seen for this long.",
			"settings.maxDevices": "Paired device cap",
			"settings.maxDevicesHint": "Hard cap on paired device sessions; the oldest is evicted when full.",
			"settings.cookieName": "Device cookie name",
			"settings.cookieNameHint": "Cookie that carries the paired device id.",
			"settings.requirePairingForLan": "Require pairing for LAN access",
			"settings.requirePairingForLanHint": "On: every non-loopback /api request must carry a live paired-device cookie. Off: the LAN fence is open and pairing only manages tokens/status.",
			"settings.publicBaseUrl": "Public address (optional)",
			"settings.publicBaseUrlHint": "The public URL of a tunnel in front of this server, e.g. a Cloudflare Tunnel: https://xxx.trycloudflare.com. When set, the QR link is built from it so a phone anywhere can pair; leave blank for LAN-only usage.",
			"settings.autoTunnel": "Auto public tunnel",
			"settings.autoTunnelHint": "When on, the plugin runs its own Cloudflare quick tunnel (no tool installation needed) and keeps the public address and trust config in sync automatically, so a phone anywhere can pair at any time; when off, the manually entered public address above applies.",
			"settings.mobileEnterToSend": "Enter to send on mobile",
			"settings.mobileEnterToSendHint": "On: Enter in the mobile composer sends immediately and Shift+Enter inserts a newline. Off: Enter inserts a newline and only the send button sends.",
			"settings.inherit": "Inherit",
			"settings.on": "On",
			"settings.off": "Off",
			"settings.overridden": "Overridden",
			"settings.reset": "Reset to default",
			"settings.notExposed": "This DSH version does not expose this plugin's settings namespace to the configuration page, so the form is unavailable. Edit ~/.dsh/settings.yaml directly, or add the namespace to dsh-host-apiproxy's WEB_SETTINGS_NAMESPACES allowlist and restart.",
			"settings.readOnly": "This deployment stores settings read-only.",
			"settings.expand": "Show settings",
			"settings.collapse": "Hide settings",
			"settings.save": "Save",
			"settings.saving": "Saving…",
			"settings.discard": "Discard",
			"settings.unsaved": "Unsaved",
			"settings.saveFailed": "The deployment did not accept these values; they were left for you to correct.",
			"settings.invalidNumber": "Enter a number, or leave blank to use the default.",
			"update.label": "Check for updates",
			"update.title": "Check for updates",
			"update.checking": "Checking the remote repository for newer releases…",
			"update.upToDate": "Everything is up to date",
			"update.upToDateDetail": "{name} is at the latest version v{version}.",
			"update.found": "A new version is available",
			"update.foundDetail": "{name} has a newer release v{version}; updating automatically…",
			"update.updating": "Updating {name} to v{version}; this may take 1-2 minutes…",
			"update.updatingTitle": "Updating automatically…",
			"update.done": "Update complete",
			"update.doneDetail": "All components are up to date.",
			"update.restartHint": "Restart dsh web for the new version to take effect: stop it with Ctrl+C in the terminal, then run dsh web again.",
			"update.linkMode": "Local development mode",
			"update.linkModeDetail": "dsh-web-ui is installed via a local link (development mode) and cannot be updated remotely. Latest npm release: {version}. Run git pull in the repository to update.",
			"update.missing": "dsh-web-ui not found",
			"update.missingDetail": "Could not locate the installed dsh-web-ui aggregate package. Install it with: dsh plugin --profile <profile> add @linxin666/dsh-web-ui-all",
			"update.offline": "Cannot reach the update source",
			"update.offlineDetail": "The network is unavailable or the update service is failing; try again later.",
			"update.unmounted": "The update service is not loaded",
			"update.unmountedDetail": "The running dsh web process loads a plugin build without the update service; restart dsh web (Ctrl+C, then run dsh web again) and retry.",
			"update.error": "Update failed",
			"update.packages": "Component versions",
			"update.retry": "Check again",
			"update.close": "Close update panel",
			"update.error.pnpmMissing": "pnpm was not found (tried pnpm / corepack / npx). Install pnpm and restart the app (Windows: npm install -g pnpm or corepack enable; macOS: brew install pnpm or corepack enable).",
			"update.error.timeout": "The update timed out and the install process was killed; try again.",
			"update.error.notFound": "The dsh-web-ui aggregate package is not installed; nothing to update.",
			"update.error.link": "Local development mode (link install) — automatic update is unavailable.",
			"update.error.pnpmFailed": "The update failed (pnpm exited with code {code}); see the output below.",
			"update.error.stale": "The update command ran but the installed versions did not change. Likely cause: the pnpm 11 minimumReleaseAge gate silently skips releases published less than 24 hours ago. Add minimumReleaseAgeExclude (e.g. \"@linxin666/*\") or set minimumReleaseAge: 0 in pnpm-workspace.yaml under the profile directory (~/.dsh/profiles/<profile>), then run the update again.",
			"update.error.verifyFailed": "The update command ran but the installed versions could not be verified afterwards (registry probe failed or the install path changed). Inspect the output below, or retry later.",
			"update.error.unknown": "Update failed; try again."
		};
		//#endregion
		//#region src/client/deep-link.ts
		/** sessionStorage key for the failed-pair notice. */
		const PAIR_FAILED_MARKER = "dsh-remote-pair-failed";
		/** Poll budget for the runtime services (activation order is unconstrained). */
		const SERVICE_WAIT_MS = 1e4;
		/** The browser implementation of {@link PageSurface}. */
		const browserPage = {
			get href() {
				return window.location.href;
			},
			replaceState(url) {
				window.history.replaceState(null, "", url);
			},
			navigate(url) {
				window.location.assign(url);
			},
			reload() {
				window.location.reload();
			}
		};
		/** Whether this browser looks like a phone/tablet (the simplified mobile surface). */
		function isMobileSurface() {
			if (typeof navigator === "undefined") return false;
			return /Android|iPhone|iPad|iPod|Mobile|mobile/i.test(navigator.userAgent);
		}
		/**
		* Run the pair/workspace boot flow for this page load.
		* @param ctx - client root context (workspaces/sessions read at need time).
		* @param search - the current location.search.
		* @param page - the page surface (defaults to the browser).
		*/
		function runPairBootFlow(ctx, search, page = browserPage) {
			const params = readPairParams(search);
			if (params.pair !== void 0) {
				runAccept(params.pair, page);
				return;
			}
			if (params.workspace !== void 0) runDeepLink(ctx, params.workspace, page);
		}
		/** Accept the token, then enter the matching desktop/mobile surface. */
		async function runAccept(token, page) {
			let ok = false;
			try {
				ok = (await acceptPair(token)).ok;
				if (!ok) sessionStorage.setItem(PAIR_FAILED_MARKER, "failed");
			} catch {
				sessionStorage.setItem(PAIR_FAILED_MARKER, "failed");
			}
			const url = new URL(page.href);
			url.searchParams.delete("pair");
			page.replaceState(`${url.pathname}${url.search}${url.hash}`);
			if (ok) if (isMobileSurface()) {
				url.pathname = "/m";
				page.navigate(`${url.pathname}${url.search}${url.hash}`);
			} else page.reload();
		}
		/**
		* Connect the deep-linked workspace and open its session. Waits for the
		* runtime services AND for the target workspace to appear in the workspace
		* list (both are asynchronous after boot), then connects and opens; gives
		* up silently within the budget — the workspace param is stripped either
		* way, so a late failure cannot loop.
		* @param ctx - client root context.
		* @param workspaceId - the target workspace.
		* @param page - the page surface.
		*/
		async function runDeepLink(ctx, workspaceId, page) {
			const target = workspaceId;
			const deadline = Date.now() + SERVICE_WAIT_MS;
			while (Date.now() < deadline) {
				const workspaces = ctx.get("workspaces");
				const sessions = ctx.get("sessions");
				if (workspaces !== void 0 && sessions !== void 0) {
					if (workspaces.list.getSnapshot().items.some((item) => item.workspaceId === target)) {
						try {
							const sessionId = await workspaces.connectWorkspace(target);
							sessions.open(sessionId);
						} catch {}
						break;
					}
				}
				await new Promise((resolve) => setTimeout(resolve, 200));
			}
			const url = new URL(page.href);
			url.searchParams.delete("workspace");
			page.replaceState(`${url.pathname}${url.search}${url.hash}`);
		}
		//#endregion
		//#region src/client/index.ts
		/**
		* Mobile remote control — browser half. Registers the `remote` dictionaries,
		* the sidebar-foot entry (phone trigger + pairing panel) into the
		* ui-sidebar-declared `sidebar.remote` seat, and runs the phone-side boot
		* flow (pair accept + workspace deep-link + presence heartbeats) plus the
		* one-time failed-pair notice. Export discipline: packages/client/AGENTS.md
		* — the /client surface carries only what cordis loading needs plus types.
		*/
		/** Dictionary namespace owned by this plugin. */
		const NS = "remote";
		/** Settings namespace the remote-control card edits (the Host plugin registers it). */
		const REMOTE_WEB_UI_NS = "remote-web-ui";
		/** Heartbeat cadence from a paired phone (presence + revocation liveness). */
		const HEARTBEAT_INTERVAL_MS = 1e4;
		/** Services required by this plugin. */
		const inject = [
			"slots",
			"locale",
			"connection",
			"settingsScope",
			"remote"
		];
		/**
		* Register the remote-control surface.
		* @param ctx - client root context.
		*/
		function apply(ctx) {
			ctx.effect(() => ctx.locale.register(NS, {
				zh,
				en
			}), "remote-web-ui: dictionaries");
			const t = ctx.locale.bind(NS);
			const settingsScope = (ctx.get("webUiSettings") ?? ctx.settingsScope).bind({ namespace: REMOTE_WEB_UI_NS });
			const enabled = () => {
				const snapshot = settingsScope.getSnapshot();
				return snapshot.status === "ready" ? snapshot.value?.enabled ?? true : snapshot.status === "unavailable";
			};
			ctx.slots.inject("sidebar.remote", () => {
				let disposeEntry;
				const syncEntry = () => {
					if (enabled() && disposeEntry === void 0) disposeEntry = ctx.slots.register({
						name: "sidebar.remote",
						locale: NS
					}, RemoteEntry);
					else if (!enabled() && disposeEntry !== void 0) {
						disposeEntry();
						disposeEntry = void 0;
					}
				};
				const unsubscribe = settingsScope.subscribe(syncEntry);
				syncEntry();
				return () => {
					unsubscribe();
					disposeEntry?.();
				};
			});
			ctx.slots.inject("sidebar.footer.action", () => {
				let disposeEntry;
				const syncEntry = () => {
					if (enabled() && disposeEntry === void 0) disposeEntry = ctx.slots.register({
						name: "sidebar.footer.action",
						id: "remote-web-ui",
						locale: NS
					}, FooterRemoteEntry);
					else if (!enabled() && disposeEntry !== void 0) {
						disposeEntry();
						disposeEntry = void 0;
					}
				};
				const unsubscribe = settingsScope.subscribe(syncEntry);
				syncEntry();
				return () => {
					unsubscribe();
					disposeEntry?.();
				};
			});
			const remoteSettings = new RemoteSettingsCardController(settingsScope);
			ctx.slots.inject("web-ui.plugin.item", () => ctx.slots.register({
				name: "web-ui.plugin.item",
				id: "remote-web-ui",
				order: 90,
				locale: NS,
				inject: () => remoteSettings.inject()
			}, RemoteSettingsCard));
			let disposeRuntime;
			const syncRuntime = () => {
				if (enabled() && disposeRuntime === void 0) disposeRuntime = ctx.effect(() => {
					const loopback = ctx.get("connection")?.isLoopback ?? true;
					runPairBootFlow(ctx, window.location.search);
					if (loopback) return () => {};
					const timer = window.setInterval(() => {
						sendHeartbeat().catch(() => {});
					}, HEARTBEAT_INTERVAL_MS);
					return () => {
						window.clearInterval(timer);
					};
				}, "remote-web-ui: pair flow + heartbeats");
				else if (!enabled() && disposeRuntime !== void 0) {
					disposeRuntime();
					disposeRuntime = void 0;
				}
			};
			settingsScope.subscribe(syncRuntime);
			syncRuntime();
			ctx.effect(() => {
				const timer = window.setTimeout(() => {
					if (sessionStorage.getItem("dsh-remote-pair-failed") === null) return;
					sessionStorage.removeItem(PAIR_FAILED_MARKER);
					const mount = document.createElement("div");
					document.body.appendChild(mount);
					(0, react_dom_client.createRoot)(mount).render((0, react.createElement)(PairFailedNotice, { t }));
				}, 1500);
				return () => {
					window.clearTimeout(timer);
				};
			}, "remote-web-ui: failed-pair notice");
		}
		//#endregion
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map