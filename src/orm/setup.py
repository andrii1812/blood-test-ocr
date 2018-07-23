import os

from orm.entities import *
from pony.orm import db_session


@db_session
def add_reference_names():
    ReferenceName(name='RBC-Alyuvarlar')
    ReferenceName(name='HGB-Hemoglobin')
    ReferenceName(name='HCT-Hematokrit')
    ReferenceName(name='MCV')
    ReferenceName(name='MCH')
    ReferenceName(name='MCHC')
    ReferenceName(name='RDW-SD')
    ReferenceName(name='RDW')
    ReferenceName(name='WBC-Akyuvarlar')
    ReferenceName(name='Nötrofıl%')
    ReferenceName(name='Lenfosıt%')
    ReferenceName(name='Monosıt%')
    ReferenceName(name='Eosınofıl%')
    ReferenceName(name='Basofıl%')
    ReferenceName(name='Nötrofıl#')
    ReferenceName(name='Lenfosıt#')
    ReferenceName(name='Monosıt#')
    ReferenceName(name='Eosınofıl#')
    ReferenceName(name='Basofıl#')
    ReferenceName(name='PLT-Trombosit')
    ReferenceName(name='MPV')
    ReferenceName(name='PDW')
    ReferenceName(name='PCT')
    ReferenceName(name='GLUKOZ, AÇLIK')
    ReferenceName(name='KALSIUM (CA), TOTAL, SERUM')
    ReferenceName(name='MAGNESIUM (Mg), TOTAL, SERUM')
    ReferenceName(name='CRP, KANTITATIF')
    ReferenceName(name='SODYUM (Na), SERUM')
    ReferenceName(name='POTASYUM (K), SERUM')
    ReferenceName(name='aPPT')
    ReferenceName(name='PT%#')
    ReferenceName(name='PROTROMBIN ZAMANI')
    ReferenceName(name='PTIRN#')
    ReferenceName(name='tFGH (CKD-EPI)#')
    ReferenceName(name='tFGH (MDRD)#')
    ReferenceName(name='KREATININ, SERUM#')
    ReferenceName(name='ÜRE, SERUM')
    ReferenceName(name='ÜRIK ACIT, SERUM')
    ReferenceName(name='PROTEIN, TOTAL, SERUM')
    ReferenceName(name='ALBUMIN, SERUM')
    ReferenceName(name='MAGNESYUM (Mg), SERUM')
    ReferenceName(name='SGOT (AST)')
    ReferenceName(name='SGPT (ALT)')
    ReferenceName(name='ALP (ALKALEN FOSFATAZ)')
    ReferenceName(name='GGT (G-GLUTAMIL TRANSFERAZ)')
    ReferenceName(name='LDH (LAKTAK DEHID.), SERUM')
    ReferenceName(name='BILIRUBIN, DIREKT, SERUM')
    ReferenceName(name='BILIRUBIN, TOTAL')


@db_session
def add_tags():
    Tag(name='Chemo1')
    Tag(name='Chemo2')
    Tag(name='SCT')


@db_session
def seed_db():
    add_reference_names()
    add_tags()


if __name__ == '__main__':
    seed_db()

