const test = require('node:test');
const assert = require('node:assert/strict');
const tools = require('./herramientas-logic.js');

test('Signos Vitales exposes all 7 age groups with clinical rows', () => {
    assert.equal(tools.VITAL_SIGNS_GROUPS.length, 7);
    const adulto = tools.getVitalSignsGroup('adulto');
    assert.ok(adulto);
    assert.equal(adulto.rows.length, 6);
    assert.equal(adulto.rows[0].normal[0], '60-100');

    const rn = tools.getVitalSignsGroup('recien-nacido');
    assert.ok(rn);
    assert.equal(rn.rows.length, 5);
    assert.equal(rn.rows[0].normal[0], '120-160');

    const mayor = tools.getVitalSignsGroup('adulto-mayor');
    assert.ok(mayor);
    assert.equal(mayor.rows[5].normal[0], '92-100');
});

test('Escala de Glasgow evaluates incomplete, leve, moderado, and severo thresholds', () => {
    const partial = tools.evaluateGlasgow({ ocular: 4, verbal: 5, motora: 0 });
    assert.equal(partial.complete, false);
    assert.equal(partial.total, null);

    const leve = tools.evaluateGlasgow({ ocular: 4, verbal: 5, motora: 6 });
    assert.equal(leve.complete, true);
    assert.equal(leve.total, 15);
    assert.equal(leve.level, 'Leve');
    assert.equal(leve.actions.length, 3);

    const moderado = tools.evaluateGlasgow({ ocular: 3, verbal: 4, motora: 5 });
    assert.equal(moderado.total, 12);
    assert.equal(moderado.level, 'Moderado');

    const severo = tools.evaluateGlasgow({ ocular: 1, verbal: 2, motora: 4 });
    assert.equal(severo.total, 7);
    assert.equal(severo.level, 'Severo');
    assert.equal(severo.actions[0], 'TRASLADO INMEDIATO');
});

test('Unit converters compute accurate values and clear cleanly on empty input', () => {
    const p = tools.convertPresionValues('psi', '100');
    assert.equal(p.bar, '6.89');
    assert.equal(p.kpa, '689.48');
    assert.equal(p.mh2o, '70.31');
    assert.deepEqual(tools.convertPresionValues('psi', ''), { psi: '', bar: '', kpa: '', mh2o: '' });

    const d = tools.convertDistanciaValues('metros', '10');
    assert.equal(d.pies, '32.81');
    assert.equal(d.pulgadas, '393.70');
    assert.equal(d.cm, '1000.00');

    const a = tools.convertAreaValues('hectareas', '1');
    assert.equal(a.m2, '10000.00');

    const v = tools.convertVolumenValues('galones', '10');
    assert.equal(v.litros, '37.85');
    assert.equal(v.m3, '0.038');

    const w = tools.convertPesoValues('kg', '1');
    assert.equal(w.lb, '2.20');
    assert.equal(w.gramos, '1000');

    const f = tools.convertFuerzaValues('kgf', '1');
    assert.equal(f.newton, '9.81');
    assert.equal(f.lbf, '2.20');

    const t = tools.convertTempValues('celsius', '0');
    assert.equal(t.fahrenheit, '32.0');
    assert.equal(t.kelvin, '273.1');

    const tNeg = tools.convertTempValues('celsius', '-40');
    assert.equal(tNeg.fahrenheit, '-40.0');

    const c = tools.convertCaudalValues('gpm', '100');
    assert.equal(c.lpm, '378.54');
    assert.equal(c.ls, '6.31');
});

test('Oxygen duration calculator handles standard and edge inputs', () => {
    assert.equal(tools.calculateOxygenDuration('2000', '0.28', '15'), '37.3');
    assert.equal(tools.calculateOxygenDuration('2000', '0.28', '0'), '');
    assert.equal(tools.calculateOxygenDuration('', '0.28', '15'), '');
});
